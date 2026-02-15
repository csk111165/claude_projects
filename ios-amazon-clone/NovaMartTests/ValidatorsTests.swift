import XCTest
@testable import NovaMart

final class ValidatorsTests: XCTestCase {
    func testValidEmail() {
        XCTAssertTrue(Validators.isValidEmail("test@example.com"))
        XCTAssertTrue(Validators.isValidEmail("a@b"))
        XCTAssertFalse(Validators.isValidEmail("invalid"))
        XCTAssertFalse(Validators.isValidEmail(""))
    }

    func testValidPassword() {
        XCTAssertTrue(Validators.isValidPassword("123456"))
        XCTAssertFalse(Validators.isValidPassword("12345"))
        XCTAssertFalse(Validators.isValidPassword(""))
    }

    func testValidPhone() {
        XCTAssertTrue(Validators.isValidPhone("1234567890"))
        XCTAssertTrue(Validators.isValidPhone("(123) 456-7890"))
        XCTAssertFalse(Validators.isValidPhone("123"))
    }

    func testValidZipCode() {
        XCTAssertTrue(Validators.isValidZipCode("12345"))
        XCTAssertTrue(Validators.isValidZipCode("123456789"))
        XCTAssertFalse(Validators.isValidZipCode("1234"))
    }

    func testValidCardNumber() {
        XCTAssertTrue(Validators.isValidCardNumber("4111111111111111"))
        XCTAssertFalse(Validators.isValidCardNumber("1234"))
    }

    func testValidExpiry() {
        XCTAssertTrue(Validators.isValidExpiry("12/25"))
        XCTAssertTrue(Validators.isValidExpiry("01/30"))
        XCTAssertFalse(Validators.isValidExpiry("13/25"))
        XCTAssertFalse(Validators.isValidExpiry("00/25"))
        XCTAssertFalse(Validators.isValidExpiry("1225"))
        XCTAssertFalse(Validators.isValidExpiry(""))
    }

    func testValidCVV() {
        XCTAssertTrue(Validators.isValidCVV("123"))
        XCTAssertTrue(Validators.isValidCVV("1234"))
        XCTAssertFalse(Validators.isValidCVV("12"))
    }

    func testValidUPI() {
        XCTAssertTrue(Validators.isValidUPI("name@upi"))
        XCTAssertFalse(Validators.isValidUPI("nametag"))
        XCTAssertFalse(Validators.isValidUPI(""))
    }

    func testValidShippingAddress() {
        let valid = ShippingAddress(fullName: "John", address: "123 St", city: "City", state: "ST", zipCode: "12345", country: "US", phone: "1234567890")
        XCTAssertTrue(Validators.isValidShippingAddress(valid))

        let invalid = ShippingAddress(fullName: "", address: "123 St", city: "City", state: "ST", zipCode: "12345", country: "US", phone: "1234567890")
        XCTAssertFalse(Validators.isValidShippingAddress(invalid))
    }
}
