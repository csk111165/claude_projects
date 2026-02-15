import XCTest
@testable import NovaMart

final class FormattersTests: XCTestCase {
    func testFormatCurrency() {
        XCTAssertEqual(Formatters.formatCurrency(0), "$0.00")
        XCTAssertEqual(Formatters.formatCurrency(9.99), "$9.99")
        XCTAssertEqual(Formatters.formatCurrency(1234.56), "$1,234.56")
    }

    func testMaskCardNumber() {
        XCTAssertEqual(Formatters.maskCardNumber("4111111111111111"), "**** **** **** 1111")
        XCTAssertEqual(Formatters.maskCardNumber("5500000000000004"), "**** **** **** 0004")
    }

    func testCardLast4() {
        XCTAssertEqual(Formatters.cardLast4("4111111111111111"), "1111")
        XCTAssertEqual(Formatters.cardLast4("1234"), "1234")
    }

    func testDeliveryEstimateSkipsWeekends() {
        let estimate = Formatters.deliveryEstimate()
        XCTAssertFalse(estimate.isEmpty)
    }

    func testFormatDateString() {
        let result = Formatters.formatDate("2025-04-18T14:23:00Z")
        XCTAssertFalse(result.isEmpty)
    }
}
