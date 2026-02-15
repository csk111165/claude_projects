import Foundation

enum PersistenceService {
    private static let defaults = UserDefaults.standard

    static func save<T: Encodable>(_ value: T, forKey key: String) {
        if let data = try? JSONEncoder().encode(value) {
            defaults.set(data, forKey: key)
        }
    }

    static func load<T: Decodable>(_ type: T.Type, forKey key: String) -> T? {
        guard let data = defaults.data(forKey: key) else { return nil }
        return try? JSONDecoder().decode(type, from: data)
    }

    static func remove(forKey key: String) {
        defaults.removeObject(forKey: key)
    }

    enum Keys {
        static let cartItems = "novamart-cart-items"
        static let savedItems = "novamart-saved-items"
        static let user = "novamart-user"
        static let orders = "novamart-orders"
        static let wishlist = "novamart-wishlist"
        static let recentlyViewed = "novamart-recently-viewed"
        static let addresses = "novamart-addresses"
        static let defaultAddressId = "novamart-default-address"
        static let paymentMethods = "novamart-payment-methods"
        static let defaultPaymentId = "novamart-default-payment"
    }
}
