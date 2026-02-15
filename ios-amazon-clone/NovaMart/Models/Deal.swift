import Foundation

struct Deal: Codable, Identifiable, Hashable {
    let id: String
    let product: Product
    let endTime: String
    let originalPrice: Double
    let dealPrice: Double

    var endDate: Date {
        ISO8601DateFormatter().date(from: endTime) ?? Date()
    }

    var isActive: Bool {
        endDate > Date()
    }

    var discountPercentage: Int {
        guard originalPrice > 0 else { return 0 }
        return Int(((originalPrice - dealPrice) / originalPrice) * 100)
    }
}
