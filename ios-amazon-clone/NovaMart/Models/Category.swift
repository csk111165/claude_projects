import Foundation

struct Subcategory: Codable, Identifiable, Hashable {
    let id: String
    let name: String
    let slug: String
}

struct Category: Codable, Identifiable, Hashable {
    let id: String
    let name: String
    let slug: String
    let image: String
    let subcategories: [Subcategory]
}
