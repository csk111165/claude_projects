import Foundation
import Observation

@Observable
final class RecentlyViewedStore {
    var items: [Product] = []

    init() {
        self.items = PersistenceService.load([Product].self, forKey: PersistenceService.Keys.recentlyViewed) ?? []
    }

    func add(_ product: Product) {
        // Remove duplicate if exists (dedup)
        items.removeAll { $0.id == product.id }
        // Insert at beginning (most recent first)
        items.insert(product, at: 0)
        // Cap at max (FIFO)
        if items.count > Constants.maxRecentlyViewed {
            items = Array(items.prefix(Constants.maxRecentlyViewed))
        }
        persist()
    }

    func clear() {
        items.removeAll()
        persist()
    }

    private func persist() {
        PersistenceService.save(items, forKey: PersistenceService.Keys.recentlyViewed)
    }
}
