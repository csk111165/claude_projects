import Foundation

enum Formatters {
    private static let currencyFormatter: NumberFormatter = {
        let f = NumberFormatter()
        f.numberStyle = .currency
        f.currencyCode = "USD"
        f.locale = Locale(identifier: "en_US")
        return f
    }()

    static func formatCurrency(_ amount: Double) -> String {
        currencyFormatter.string(from: NSNumber(value: amount)) ?? "$0.00"
    }

    private static let dateDisplayFormatter: DateFormatter = {
        let f = DateFormatter()
        f.dateStyle = .long
        f.locale = Locale(identifier: "en_US")
        return f
    }()

    private static let iso8601Formatter = ISO8601DateFormatter()

    static func formatDate(_ isoString: String) -> String {
        guard let date = iso8601Formatter.date(from: isoString) else {
            return isoString
        }
        return dateDisplayFormatter.string(from: date)
    }

    static func formatDate(_ date: Date) -> String {
        dateDisplayFormatter.string(from: date)
    }

    static func deliveryEstimate(from date: Date = Date()) -> String {
        var businessDays = 0
        var currentDate = date
        let calendar = Calendar.current

        while businessDays < 5 {
            currentDate = calendar.date(byAdding: .day, value: 1, to: currentDate)!
            let weekday = calendar.component(.weekday, from: currentDate)
            if weekday != 1 && weekday != 7 { // Skip Sunday(1) and Saturday(7)
                businessDays += 1
            }
        }

        return formatDate(currentDate)
    }

    static func maskCardNumber(_ number: String) -> String {
        let digits = number.filter { $0.isNumber }
        guard digits.count >= 4 else { return number }
        let last4 = String(digits.suffix(4))
        return "**** **** **** \(last4)"
    }

    static func cardLast4(_ number: String) -> String {
        let digits = number.filter { $0.isNumber }
        return String(digits.suffix(4))
    }
}
