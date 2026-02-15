import Foundation
import Observation

@Observable
final class WishlistStore {
    var items: [Product] = []

    init() {
        self.items = PersistenceService.load([Product].self, forKey: PersistenceService.Keys.wishlist) ?? []
    }

    var count: Int { items.count }

    func contains(_ productId: String) -> Bool {
        items.contains { $0.id == productId }
    }

    func toggle(_ product: Product) {
        if contains(product.id) {
            remove(product.id)
        } else {
            add(product)
        }
    }

    func add(_ product: Product) {
        guard !contains(product.id) else { return }
        items.append(product)
        persist()
    }

    func remove(_ productId: String) {
        items.removeAll { $0.id == productId }
        persist()
    }

    func clear() {
        items.removeAll()
        persist()
    }

    private func persist() {
        PersistenceService.save(items, forKey: PersistenceService.Keys.wishlist)
    }
}
