import Foundation
import Observation

@Observable
final class AuthStore {
    var user: User?
    var isAuthenticated: Bool = false
    var orders: [Order] = []

    init() {
        self.user = PersistenceService.load(User.self, forKey: PersistenceService.Keys.user)
        self.isAuthenticated = user != nil
        self.orders = PersistenceService.load([Order].self, forKey: PersistenceService.Keys.orders) ?? []
    }

    @discardableResult
    func signIn(email: String, password: String) -> Bool {
        guard !email.isEmpty, email.contains("@") else { return false }
        let name = String(email.split(separator: "@").first ?? "")
        let capitalizedName = name.prefix(1).uppercased() + name.dropFirst()
        let newUser = User(id: "user-1", name: capitalizedName, email: email)
        self.user = newUser
        self.isAuthenticated = true
        persist()
        return true
    }

    @discardableResult
    func signUp(name: String, email: String, password: String) -> Bool {
        guard !name.isEmpty, !email.isEmpty, email.contains("@") else { return false }
        let newUser = User(id: "user-\(Int(Date().timeIntervalSince1970))", name: name, email: email)
        self.user = newUser
        self.isAuthenticated = true
        persist()
        return true
    }

    func signOut() {
        self.user = nil
        self.isAuthenticated = false
        persist()
    }

    func addOrder(_ order: Order) {
        orders.insert(order, at: 0)
        persistOrders()
    }

    func cancelOrder(_ orderId: String) {
        guard let index = orders.firstIndex(where: { $0.id == orderId }),
              orders[index].status == .processing else { return }
        orders[index].status = .cancelled
        persistOrders()
    }

    private func persist() {
        if let user {
            PersistenceService.save(user, forKey: PersistenceService.Keys.user)
        } else {
            PersistenceService.remove(forKey: PersistenceService.Keys.user)
        }
    }

    private func persistOrders() {
        PersistenceService.save(orders, forKey: PersistenceService.Keys.orders)
    }
}
