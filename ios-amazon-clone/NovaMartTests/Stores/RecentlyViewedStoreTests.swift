import XCTest
@testable import NovaMart

final class RecentlyViewedStoreTests: XCTestCase {
    var store: RecentlyViewedStore!

    override func setUp() {
        super.setUp()
        store = RecentlyViewedStore()
        store.clear()
    }

    func testAddProduct() {
        store.add(mockProducts[0])
        XCTAssertEqual(store.items.count, 1)
    }

    func testDeduplication() {
        store.add(mockProducts[0])
        store.add(mockProducts[1])
        store.add(mockProducts[0]) // re-add
        XCTAssertEqual(store.items.count, 2)
        XCTAssertEqual(store.items.first?.id, mockProducts[0].id) // most recent first
    }

    func testMaxItems() {
        for i in 0..<15 {
            store.add(mockProducts[i % mockProducts.count])
        }
        XCTAssertLessThanOrEqual(store.items.count, 12)
    }

    func testFIFO() {
        // Add 13 unique products
        for i in 0..<13 {
            store.add(mockProducts[i])
        }
        XCTAssertEqual(store.items.count, 12)
        // The first product added should be gone
        XCTAssertFalse(store.items.contains(where: { \/bin/zsh.id == mockProducts[0].id }))
        // The most recent should be first
        XCTAssertEqual(store.items.first?.id, mockProducts[12].id)
    }

    func testMostRecentFirst() {
        store.add(mockProducts[0])
        store.add(mockProducts[1])
        store.add(mockProducts[2])
        XCTAssertEqual(store.items.first?.id, mockProducts[2].id)
    }
}
