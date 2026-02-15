import Foundation

struct Banner: Codable, Identifiable, Hashable {
    let id: String
    let title: String
    let subtitle: String
    let image: String
    let ctaText: String
    let ctaLink: String
    let bgColor: String
}
