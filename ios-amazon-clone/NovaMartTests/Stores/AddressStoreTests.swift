import XCTest
@testable import NovaMart

final class AddressStoreTests: XCTestCase {
    var store: AddressStore!
    let testAddress = ShippingAddress(fullName: "John Doe", address: "123 Main St", city: "Springfield", state: "IL", zipCode: "62701", country: "US", phone: "2175551234")

    override func setUp() {
        super.setUp()
        store = AddressStore()
        for addr in store.addresses {
            store.removeAddress(addr.id)
        }
    }

    func testAddFirstAutoDefaults() {
        store.addAddress(testAddress, label: "Home")
        XCTAssertEqual(store.addresses.count, 1)
        XCTAssertTrue(store.addresses.first!.isDefault)
        XCTAssertNotNil(store.defaultAddress)
    }

    func testSecondDoesNotAutoDefault() {
        store.addAddress(testAddress, label: "Home")
        let addr2 = ShippingAddress(fullName: "Jane", address: "456 Oak", city: "Chicago", state: "IL", zipCode: "60601", country: "US", phone: "3125551234")
        store.addAddress(addr2, label: "Office")
        XCTAssertEqual(store.addresses.count, 2)
        XCTAssertTrue(store.addresses[0].isDefault)
        XCTAssertFalse(store.addresses[1].isDefault)
    }

    func testSetDefault() {
        store.addAddress(testAddress, label: "Home")
        let addr2 = ShippingAddress(fullName: "Jane", address: "456 Oak", city: "Chicago", state: "IL", zipCode: "60601", country: "US", phone: "3125551234")
        store.addAddress(addr2, label: "Office")
        let officeId = store.addresses[1].id
        store.setDefault(officeId)
        XCTAssertEqual(store.defaultAddressId, officeId)
        XCTAssertFalse(store.addresses[0].isDefault)
        XCTAssertTrue(store.addresses[1].isDefault)
    }

    func testDeleteDefaultReassigns() {
        store.addAddress(testAddress, label: "Home")
        let addr2 = ShippingAddress(fullName: "Jane", address: "456 Oak", city: "Chicago", state: "IL", zipCode: "60601", country: "US", phone: "3125551234")
        store.addAddress(addr2, label: "Office")
        let homeId = store.addresses[0].id
        store.removeAddress(homeId) // delete the default
        XCTAssertEqual(store.addresses.count, 1)
        XCTAssertTrue(store.addresses[0].isDefault) // Office is now default
        XCTAssertEqual(store.defaultAddressId, store.addresses[0].id)
    }

    func testRemoveAll() {
        store.addAddress(testAddress, label: "Home")
        store.removeAddress(store.addresses[0].id)
        XCTAssertTrue(store.addresses.isEmpty)
        XCTAssertNil(store.defaultAddressId)
    }
}
