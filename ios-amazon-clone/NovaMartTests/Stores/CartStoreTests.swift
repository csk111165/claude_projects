import XCTest
@testable import NovaMart

final class CartStoreTests: XCTestCase {
    var store: CartStore!
    let product1 = mockProducts[0] // $449.99
    let product2 = mockProducts[8] // $49.99 (polo)
    let cheapProduct = mockProducts[52] // $19.99 (LED lights)

    override func setUp() {
        super.setUp()
        store = CartStore()
        store.clearCart()
        // Also clear saved items
        for item in store.savedItems {
            store.removeSavedItem(item.product.id)
        }
    }

    func testAddItem() {
        store.addItem(product1)
        XCTAssertEqual(store.items.count, 1)
        XCTAssertEqual(store.totalItems, 1)
    }

    func testAddDuplicateMergesQuantity() {
        store.addItem(product1)
        store.addItem(product1, quantity: 2)
        XCTAssertEqual(store.items.count, 1)
        XCTAssertEqual(store.items.first?.quantity, 3)
    }

    func testRemoveItem() {
        store.addItem(product1)
        store.removeItem(product1.id)
        XCTAssertTrue(store.items.isEmpty)
    }

    func testUpdateQuantity() {
        store.addItem(product1)
        store.updateQuantity(product1.id, quantity: 5)
        XCTAssertEqual(store.items.first?.quantity, 5)
    }

    func testUpdateQuantityRejectsZero() {
        store.addItem(product1)
        store.updateQuantity(product1.id, quantity: 0)
        XCTAssertEqual(store.items.first?.quantity, 1)
    }

    func testSubtotal() {
        store.addItem(product1) // 449.99
        store.addItem(product2, quantity: 2) // 49.99 * 2
        let expected = 449.99 + 49.99 * 2
        XCTAssertEqual(store.subtotal, expected, accuracy: 0.01)
    }

    func testTaxIs8Percent() {
        store.addItem(product1) // 449.99
        let expectedTax = 449.99 * 0.08
        XCTAssertEqual(store.tax, expectedTax, accuracy: 0.01)
    }

    func testFreeShippingAboveThreshold() {
        store.addItem(product1) // 449.99 > 35
        XCTAssertEqual(store.shipping, 0)
    }

    func testShippingCostBelowThreshold() {
        store.addItem(cheapProduct) // 19.99 < 35
        XCTAssertEqual(store.shipping, 5.99)
    }

    func testShippingZeroWhenCartEmpty() {
        XCTAssertEqual(store.shipping, 0)
    }

    func testTotal() {
        store.addItem(product1) // 449.99
        let expectedTotal = 449.99 + (449.99 * 0.08) + 0 // free shipping
        XCTAssertEqual(store.total, expectedTotal, accuracy: 0.01)
    }

    func testClearCart() {
        store.addItem(product1)
        store.addItem(product2)
        store.clearCart()
        XCTAssertTrue(store.items.isEmpty)
        XCTAssertEqual(store.totalItems, 0)
    }

    func testSaveForLater() {
        store.addItem(product1)
        store.saveForLater(product1.id)
        XCTAssertTrue(store.items.isEmpty)
        XCTAssertEqual(store.savedItems.count, 1)
    }

    func testMoveToCart() {
        store.addItem(product1)
        store.saveForLater(product1.id)
        store.moveToCart(product1.id)
        XCTAssertEqual(store.items.count, 1)
        XCTAssertTrue(store.savedItems.isEmpty)
    }
}
