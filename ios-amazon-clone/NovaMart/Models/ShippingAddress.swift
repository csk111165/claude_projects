import Foundation

struct ShippingAddress: Codable, Hashable {
    var fullName: String
    var address: String
    var city: String
    var state: String
    var zipCode: String
    var country: String
    var phone: String
}

struct SavedAddress: Codable, Identifiable, Hashable {
    let id: String
    var label: String
    var isDefault: Bool
    var fullName: String
    var address: String
    var city: String
    var state: String
    var zipCode: String
    var country: String
    var phone: String

    var shippingAddress: ShippingAddress {
        ShippingAddress(fullName: fullName, address: address, city: city, state: state, zipCode: zipCode, country: country, phone: phone)
    }

    init(id: String, label: String, isDefault: Bool, address: ShippingAddress) {
        self.id = id
        self.label = label
        self.isDefault = isDefault
        self.fullName = address.fullName
        self.address = address.address
        self.city = address.city
        self.state = address.state
        self.zipCode = address.zipCode
        self.country = address.country
        self.phone = address.phone
    }

    init(id: String, label: String, isDefault: Bool, fullName: String, address: String, city: String, state: String, zipCode: String, country: String, phone: String) {
        self.id = id
        self.label = label
        self.isDefault = isDefault
        self.fullName = fullName
        self.address = address
        self.city = city
        self.state = state
        self.zipCode = zipCode
        self.country = country
        self.phone = phone
    }
}
