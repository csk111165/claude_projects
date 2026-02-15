import Foundation

struct Product: Codable, Identifiable, Hashable {
    let id: String
    let name: String
    let slug: String
    let description: String
    let price: Double
    let originalPrice: Double
    let discount: Int
    let images: [String]
    let category: String
    let subcategory: String
    let brand: String
    let rating: Double
    let reviewCount: Int
    let inStock: Bool
    let specs: [String: String]
    let features: [String]
    let tags: [String]
}
