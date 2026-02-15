import XCTest
@testable import NovaMart

final class AuthStoreTests: XCTestCase {
    var store: AuthStore!

    override func setUp() {
        super.setUp()
        store = AuthStore()
        store.signOut()
    }

    func testSignInWithValidEmail() {
        let result = store.signIn(email: "test@example.com", password: "password")
        XCTAssertTrue(result)
        XCTAssertTrue(store.isAuthenticated)
        XCTAssertEqual(store.user?.email, "test@example.com")
        XCTAssertEqual(store.user?.name, "Test")
    }

    func testSignInWithInvalidEmail() {
        let result = store.signIn(email: "invalid", password: "password")
        XCTAssertFalse(result)
        XCTAssertFalse(store.isAuthenticated)
    }

    func testSignInWithEmptyEmail() {
        let result = store.signIn(email: "", password: "password")
        XCTAssertFalse(result)
        XCTAssertFalse(store.isAuthenticated)
    }

    func testSignUp() {
        let result = store.signUp(name: "John", email: "john@test.com", password: "123456")
        XCTAssertTrue(result)
        XCTAssertTrue(store.isAuthenticated)
        XCTAssertEqual(store.user?.name, "John")
    }

    func testSignUpInvalid() {
        XCTAssertFalse(store.signUp(name: "", email: "a@b.com", password: "123456"))
        XCTAssertFalse(store.signUp(name: "A", email: "invalid", password: "123456"))
    }

    func testSignOut() {
        store.signIn(email: "test@example.com", password: "pass")
        store.signOut()
        XCTAssertFalse(store.isAuthenticated)
        XCTAssertNil(store.user)
    }

    func testAddOrder() {
        store.signIn(email: "test@example.com", password: "pass")
        let order = Order(id: "ord-1", items: [], total: 100, status: .processing, date: "2025-01-01T00:00:00Z", shippingAddress: ShippingAddress(fullName: "Test", address: "123 St", city: "City", state: "ST", zipCode: "12345", country: "US", phone: "1234567890"))
        store.addOrder(order)
        XCTAssertEqual(store.orders.count, 1)
        XCTAssertEqual(store.orders.first?.id, "ord-1")
    }

    func testCancelOrderOnlyFromProcessing() {
        let order1 = Order(id: "ord-1", items: [], total: 100, status: .processing, date: "2025-01-01T00:00:00Z", shippingAddress: ShippingAddress(fullName: "T", address: "A", city: "C", state: "S", zipCode: "12345", country: "US", phone: "1234567890"))
        let order2 = Order(id: "ord-2", items: [], total: 50, status: .shipped, date: "2025-01-01T00:00:00Z", shippingAddress: ShippingAddress(fullName: "T", address: "A", city: "C", state: "S", zipCode: "12345", country: "US", phone: "1234567890"))
        store.addOrder(order1)
        store.addOrder(order2)

        store.cancelOrder("ord-1")
        XCTAssertEqual(store.orders.first(where: { \/bin/zsh.id == "ord-1" })?.status, .cancelled)

        store.cancelOrder("ord-2")
        XCTAssertEqual(store.orders.first(where: { \/bin/zsh.id == "ord-2" })?.status, .shipped) // Should NOT cancel
    }

    func testOrdersPrepended() {
        let order1 = Order(id: "ord-1", items: [], total: 100, status: .processing, date: "2025-01-01T00:00:00Z", shippingAddress: ShippingAddress(fullName: "T", address: "A", city: "C", state: "S", zipCode: "12345", country: "US", phone: "1234567890"))
        let order2 = Order(id: "ord-2", items: [], total: 200, status: .processing, date: "2025-01-02T00:00:00Z", shippingAddress: ShippingAddress(fullName: "T", address: "A", city: "C", state: "S", zipCode: "12345", country: "US", phone: "1234567890"))
        store.addOrder(order1)
        store.addOrder(order2)
        XCTAssertEqual(store.orders.first?.id, "ord-2")
    }
}
