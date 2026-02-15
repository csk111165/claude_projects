import Foundation

enum Helpers {
    static func generateId() -> String {
        let chars = "abcdefghijklmnopqrstuvwxyz0123456789"
        return String((0..<7).map { _ in chars.randomElement()! })
    }

    static func slugify(_ text: String) -> String {
        text.lowercased()
            .replacingOccurrences(of: "[^\\w ]+", with: "", options: .regularExpression)
            .replacingOccurrences(of: " +", with: "-", options: .regularExpression)
    }

    static func truncate(_ str: String, length: Int) -> String {
        if str.count <= length { return str }
        return String(str.prefix(length)) + "..."
    }

    static func calculateDiscount(price: Double, originalPrice: Double) -> Int {
        guard originalPrice > 0 else { return 0 }
        return Int(((originalPrice - price) / originalPrice) * 100)
    }

    static func timeRemaining(until date: Date) -> (hours: Int, minutes: Int, seconds: Int)? {
        let interval = date.timeIntervalSince(Date())
        guard interval > 0 else { return nil }

        let totalSeconds = Int(interval)
        let hours = totalSeconds / 3600
        let minutes = (totalSeconds % 3600) / 60
        let seconds = totalSeconds % 60
        return (hours, minutes, seconds)
    }
}
