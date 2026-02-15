import Foundation

struct Review: Codable, Identifiable, Hashable {
    let id: String
    let productId: String
    let userName: String
    let rating: Int
    let title: String
    let comment: String
    let date: String
    let helpful: Int
}
