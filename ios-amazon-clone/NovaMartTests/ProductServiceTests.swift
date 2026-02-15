import XCTest
@testable import NovaMart

final class ProductServiceTests: XCTestCase {
    func testSearchByName() {
        let results = ProductService.searchProducts("MacBook")
        XCTAssertTrue(results.contains(where: { \/bin/zsh.id == "prod-3" }))
    }

    func testSearchByBrand() {
        let results = ProductService.searchProducts("Sony")
        XCTAssertTrue(results.contains(where: { \/bin/zsh.id == "prod-2" }))
    }

    func testSearchCaseInsensitive() {
        let results = ProductService.searchProducts("macbook")
        XCTAssertTrue(results.contains(where: { \/bin/zsh.id == "prod-3" }))
    }

    func testSearchEmptyReturnsAll() {
        let results = ProductService.searchProducts("")
        XCTAssertEqual(results.count, mockProducts.count)
    }

    func testFilterByCategory() {
        let results = ProductService.filterByCategory("electronics")
        XCTAssertEqual(results.count, 8)
        XCTAssertTrue(results.allSatisfy { \/bin/zsh.category == "electronics" })
    }

    func testFilterByPriceRange() {
        let results = ProductService.filterByPriceRange(min: 0, max: 25)
        XCTAssertTrue(results.allSatisfy { \/bin/zsh.price <= 25 })
    }

    func testFilterByRating() {
        let results = ProductService.filterByRating(minRating: 4.5)
        XCTAssertTrue(results.allSatisfy { \/bin/zsh.rating >= 4.5 })
    }

    func testSortByPriceAsc() {
        let sorted = ProductService.sortProducts(mockProducts, by: "price-asc")
        for i in 0..<sorted.count - 1 {
            XCTAssertLessThanOrEqual(sorted[i].price, sorted[i + 1].price)
        }
    }

    func testSortByPriceDesc() {
        let sorted = ProductService.sortProducts(mockProducts, by: "price-desc")
        for i in 0..<sorted.count - 1 {
            XCTAssertGreaterThanOrEqual(sorted[i].price, sorted[i + 1].price)
        }
    }

    func testSortByRating() {
        let sorted = ProductService.sortProducts(mockProducts, by: "rating")
        for i in 0..<sorted.count - 1 {
            XCTAssertGreaterThanOrEqual(sorted[i].rating, sorted[i + 1].rating)
        }
    }

    func testGetProductById() {
        let product = ProductService.getProduct(byId: "prod-1")
        XCTAssertNotNil(product)
        XCTAssertEqual(product?.name, "ProVision 4K Ultra HD Smart TV 55\"")
    }

    func testGetRelatedProducts() {
        let tv = mockProducts[0]
        let related = ProductService.getRelatedProducts(for: tv)
        XCTAssertFalse(related.isEmpty)
        XCTAssertFalse(related.contains(where: { \/bin/zsh.id == tv.id }))
    }

    func testOutOfStockProducts() {
        let outOfStock = mockProducts.filter { !\/bin/zsh.inStock }
        XCTAssertEqual(outOfStock.count, 2) // prod-41, prod-51
    }

    func testTotalProductCount() {
        XCTAssertEqual(mockProducts.count, 54)
    }
}
