import Foundation

struct User: Codable, Identifiable, Hashable {
    let id: String
    let name: String
    let email: String
    var avatar: String?
}
