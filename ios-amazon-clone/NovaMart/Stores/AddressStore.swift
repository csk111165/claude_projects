import Foundation
import Observation

@Observable
final class AddressStore {
    var addresses: [SavedAddress] = []
    var defaultAddressId: String?

    init() {
        self.addresses = PersistenceService.load([SavedAddress].self, forKey: PersistenceService.Keys.addresses) ?? []
        self.defaultAddressId = UserDefaults.standard.string(forKey: PersistenceService.Keys.defaultAddressId)
    }

    var defaultAddress: SavedAddress? {
        addresses.first { $0.id == defaultAddressId }
    }

    func addAddress(_ address: ShippingAddress, label: String, setAsDefault: Bool = false) {
        let id = Helpers.generateId()
        let isFirst = addresses.isEmpty
        let shouldBeDefault = setAsDefault || isFirst

        if shouldBeDefault {
            for i in addresses.indices {
                addresses[i].isDefault = false
            }
        }

        let saved = SavedAddress(id: id, label: label, isDefault: shouldBeDefault, address: address)
        addresses.append(saved)

        if shouldBeDefault {
            defaultAddressId = id
        }
        persist()
    }

    func updateAddress(_ id: String, fullName: String? = nil, address: String? = nil, city: String? = nil, state: String? = nil, zipCode: String? = nil, country: String? = nil, phone: String? = nil, label: String? = nil) {
        guard let index = addresses.firstIndex(where: { $0.id == id }) else { return }
        if let fullName { addresses[index].fullName = fullName }
        if let address { addresses[index].address = address }
        if let city { addresses[index].city = city }
        if let state { addresses[index].state = state }
        if let zipCode { addresses[index].zipCode = zipCode }
        if let country { addresses[index].country = country }
        if let phone { addresses[index].phone = phone }
        if let label { addresses[index].label = label }
        persist()
    }

    func removeAddress(_ id: String) {
        let wasDefault = defaultAddressId == id
        addresses.removeAll { $0.id == id }

        if wasDefault {
            let newDefaultId = addresses.first?.id
            defaultAddressId = newDefaultId
            for i in addresses.indices {
                addresses[i].isDefault = addresses[i].id == newDefaultId
            }
        }
        persist()
    }

    func setDefault(_ id: String) {
        defaultAddressId = id
        for i in addresses.indices {
            addresses[i].isDefault = addresses[i].id == id
        }
        persist()
    }

    private func persist() {
        PersistenceService.save(addresses, forKey: PersistenceService.Keys.addresses)
        if let defaultAddressId {
            UserDefaults.standard.set(defaultAddressId, forKey: PersistenceService.Keys.defaultAddressId)
        } else {
            UserDefaults.standard.removeObject(forKey: PersistenceService.Keys.defaultAddressId)
        }
    }
}
