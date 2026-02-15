import XCTest
@testable import NovaMart

final class PaymentStoreTests: XCTestCase {
    var store: PaymentStore!

    override func setUp() {
        super.setUp()
        store = PaymentStore()
        for method in store.methods {
            store.removeMethod(method.id)
        }
    }

    func testAddFirstAutoDefaults() {
        store.addMethod(.creditCard, label: "Visa", cardNumber: "4111111111111111", nameOnCard: "John", expiry: "12/25")
        XCTAssertEqual(store.methods.count, 1)
        XCTAssertTrue(store.methods.first!.isDefault)
        XCTAssertNotNil(store.defaultMethod)
    }

    func testCardMasking() {
        store.addMethod(.creditCard, label: "Visa", cardNumber: "4111111111111111", nameOnCard: "John", expiry: "12/25")
        XCTAssertEqual(store.methods.first?.cardLast4, "1111")
        XCTAssertEqual(store.methods.first?.cardNumber, "**** **** **** 1111")
    }

    func testSecondDoesNotAutoDefault() {
        store.addMethod(.creditCard, label: "Visa", cardNumber: "4111111111111111", nameOnCard: "John", expiry: "12/25")
        store.addMethod(.upi, label: "UPI", upiId: "john@upi")
        XCTAssertEqual(store.methods.count, 2)
        XCTAssertTrue(store.methods[0].isDefault)
        XCTAssertFalse(store.methods[1].isDefault)
    }

    func testSetDefault() {
        store.addMethod(.creditCard, label: "Visa", cardNumber: "4111111111111111", nameOnCard: "John", expiry: "12/25")
        store.addMethod(.upi, label: "UPI", upiId: "john@upi")
        let upiId = store.methods[1].id
        store.setDefault(upiId)
        XCTAssertTrue(store.methods[1].isDefault)
        XCTAssertFalse(store.methods[0].isDefault)
    }

    func testDeleteDefaultReassigns() {
        store.addMethod(.creditCard, label: "Visa", cardNumber: "4111111111111111", nameOnCard: "John", expiry: "12/25")
        store.addMethod(.upi, label: "UPI", upiId: "john@upi")
        let visaId = store.methods[0].id
        store.removeMethod(visaId)
        XCTAssertEqual(store.methods.count, 1)
        XCTAssertTrue(store.methods[0].isDefault)
    }

    func testDisplayText() {
        store.addMethod(.creditCard, label: "Visa", cardNumber: "4111111111111111", nameOnCard: "John", expiry: "12/25")
        XCTAssertTrue(store.methods.first!.displayText.contains("1111"))

        store.addMethod(.upi, label: "UPI", upiId: "john@upi")
        XCTAssertTrue(store.methods[1].displayText.contains("john@upi"))

        store.addMethod(.netBanking, label: "SBI", bankName: "State Bank of India")
        XCTAssertTrue(store.methods[2].displayText.contains("State Bank of India"))
    }
}
