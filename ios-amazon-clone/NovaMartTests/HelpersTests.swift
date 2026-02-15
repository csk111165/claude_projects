import XCTest
@testable import NovaMart

final class HelpersTests: XCTestCase {
    func testGenerateIdLength() {
        let id = Helpers.generateId()
        XCTAssertEqual(id.count, 7)
    }

    func testGenerateIdUniqueness() {
        let ids = (0..<100).map { _ in Helpers.generateId() }
        let uniqueIds = Set(ids)
        XCTAssertEqual(uniqueIds.count, ids.count)
    }

    func testSlugify() {
        XCTAssertEqual(Helpers.slugify("Hello World"), "hello-world")
        XCTAssertEqual(Helpers.slugify("iPhone 15 Pro!"), "iphone-15-pro")
    }

    func testTruncate() {
        XCTAssertEqual(Helpers.truncate("Hello World", length: 5), "Hello...")
        XCTAssertEqual(Helpers.truncate("Hi", length: 5), "Hi")
    }

    func testCalculateDiscount() {
        XCTAssertEqual(Helpers.calculateDiscount(price: 449.99, originalPrice: 699.99), 36)
        XCTAssertEqual(Helpers.calculateDiscount(price: 100, originalPrice: 100), 0)
    }

    func testTimeRemaining() {
        let future = Date().addingTimeInterval(3600) // 1 hour
        let remaining = Helpers.timeRemaining(until: future)
        XCTAssertNotNil(remaining)
        XCTAssertGreaterThan(remaining!.hours * 3600 + remaining!.minutes * 60 + remaining!.seconds, 0)

        let past = Date().addingTimeInterval(-100)
        XCTAssertNil(Helpers.timeRemaining(until: past))
    }
}
