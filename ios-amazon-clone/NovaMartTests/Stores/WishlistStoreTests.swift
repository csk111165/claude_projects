import XCTest
@testable import NovaMart

final class WishlistStoreTests: XCTestCase {
    var store: WishlistStore!

    override func setUp() {
        super.setUp()
        store = WishlistStore()
        store.clear()
    }

    func testAddProduct() {
        store.add(mockProducts[0])
        XCTAssertEqual(store.count, 1)
        XCTAssertTrue(store.contains(mockProducts[0].id))
    }

    func testNoDuplicates() {
        store.add(mockProducts[0])
        store.add(mockProducts[0])
        XCTAssertEqual(store.count, 1)
    }

    func testRemoveProduct() {
        store.add(mockProducts[0])
        store.remove(mockProducts[0].id)
        XCTAssertEqual(store.count, 0)
    }

    func testToggle() {
        store.toggle(mockProducts[0])
        XCTAssertTrue(store.contains(mockProducts[0].id))
        store.toggle(mockProducts[0])
        XCTAssertFalse(store.contains(mockProducts[0].id))
    }

    func testClear() {
        store.add(mockProducts[0])
        store.add(mockProducts[1])
        store.clear()
        XCTAssertEqual(store.count, 0)
    }
}
