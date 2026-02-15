import Foundation
import Observation

@Observable
final class CartStore {
    var items: [CartItem] = []
    var savedItems: [CartItem] = []

    init() {
        self.items = PersistenceService.load([CartItem].self, forKey: PersistenceService.Keys.cartItems) ?? []
        self.savedItems = PersistenceService.load([CartItem].self, forKey: PersistenceService.Keys.savedItems) ?? []
    }

    // MARK: - Computed Properties

    var totalItems: Int {
        items.reduce(0) { $0 + $1.quantity }
    }

    var subtotal: Double {
        items.reduce(0) { $0 + $1.product.price * Double($1.quantity) }
    }

    var tax: Double {
        subtotal * Constants.taxRate
    }

    var shipping: Double {
        guard subtotal > 0 else { return 0 }
        return subtotal >= Constants.shippingThreshold ? 0 : Constants.shippingCost
    }

    var total: Double {
        subtotal + tax + shipping
    }

    // MARK: - Actions

    func addItem(_ product: Product, quantity: Int = 1) {
        if let index = items.firstIndex(where: { $0.product.id == product.id }) {
            items[index].quantity += quantity
        } else {
            items.append(CartItem(product: product, quantity: quantity))
        }
        persistCart()
    }

    func removeItem(_ productId: String) {
        items.removeAll { $0.product.id == productId }
        persistCart()
    }

    func updateQuantity(_ productId: String, quantity: Int) {
        guard quantity >= 1 else { return }
        if let index = items.firstIndex(where: { $0.product.id == productId }) {
            items[index].quantity = quantity
        }
        persistCart()
    }

    func clearCart() {
        items.removeAll()
        persistCart()
    }

    func saveForLater(_ productId: String) {
        guard let item = items.first(where: { $0.product.id == productId }) else { return }
        items.removeAll { $0.product.id == productId }
        if !savedItems.contains(where: { $0.product.id == productId }) {
            savedItems.append(CartItem(product: item.product, quantity: 1))
        }
        persistCart()
        persistSaved()
    }

    func moveToCart(_ productId: String) {
        guard let item = savedItems.first(where: { $0.product.id == productId }) else { return }
        savedItems.removeAll { $0.product.id == productId }
        if let index = items.firstIndex(where: { $0.product.id == productId }) {
            items[index].quantity += 1
        } else {
            items.append(CartItem(product: item.product, quantity: 1))
        }
        persistCart()
        persistSaved()
    }

    func removeSavedItem(_ productId: String) {
        savedItems.removeAll { $0.product.id == productId }
        persistSaved()
    }

    // MARK: - Persistence

    private func persistCart() {
        PersistenceService.save(items, forKey: PersistenceService.Keys.cartItems)
    }

    private func persistSaved() {
        PersistenceService.save(savedItems, forKey: PersistenceService.Keys.savedItems)
    }
}
