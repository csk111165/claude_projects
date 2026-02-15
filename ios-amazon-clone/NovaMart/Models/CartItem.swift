import Foundation

struct CartItem: Codable, Identifiable, Hashable {
    var id: String { product.id }
    let product: Product
    var quantity: Int
}
