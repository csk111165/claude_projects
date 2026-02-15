import XCTest
@testable import NovaMart

final class PersistenceServiceTests: XCTestCase {
    private let testKey = "test-persistence-key"

    override func tearDown() {
        PersistenceService.remove(forKey: testKey)
        super.tearDown()
    }

    func testSaveAndLoad() {
        let product = mockProducts[0]
        PersistenceService.save(product, forKey: testKey)
        let loaded = PersistenceService.load(Product.self, forKey: testKey)
        XCTAssertNotNil(loaded)
        XCTAssertEqual(loaded?.id, product.id)
    }

    func testSaveArray() {
        let products = Array(mockProducts.prefix(3))
        PersistenceService.save(products, forKey: testKey)
        let loaded = PersistenceService.load([Product].self, forKey: testKey)
        XCTAssertEqual(loaded?.count, 3)
    }

    func testRemove() {
        PersistenceService.save("hello", forKey: testKey)
        PersistenceService.remove(forKey: testKey)
        let loaded = PersistenceService.load(String.self, forKey: testKey)
        XCTAssertNil(loaded)
    }

    func testLoadNonexistentKey() {
        let loaded = PersistenceService.load(String.self, forKey: "nonexistent-key-xyz")
        XCTAssertNil(loaded)
    }
}
