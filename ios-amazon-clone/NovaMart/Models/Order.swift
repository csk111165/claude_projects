import Foundation

enum OrderStatus: String, Codable, Hashable, CaseIterable {
    case processing
    case shipped
    case delivered
    case cancelled
}

struct Order: Codable, Identifiable, Hashable {
    let id: String
    let items: [CartItem]
    let total: Double
    var status: OrderStatus
    let date: String
    let shippingAddress: ShippingAddress
}
