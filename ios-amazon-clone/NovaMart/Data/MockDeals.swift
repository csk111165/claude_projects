import Foundation

let mockDeals: [Deal] = {
    let calendar = Calendar.current
    let now = Date()

    var tomorrow = calendar.date(byAdding: .day, value: 1, to: now)!
    tomorrow = calendar.date(bySettingHour: 23, minute: 59, second: 59, of: tomorrow)!

    var dayAfterTomorrow = calendar.date(byAdding: .day, value: 2, to: now)!
    dayAfterTomorrow = calendar.date(bySettingHour: 23, minute: 59, second: 59, of: dayAfterTomorrow)!

    var nextWeek = calendar.date(byAdding: .day, value: 7, to: now)!
    nextWeek = calendar.date(bySettingHour: 23, minute: 59, second: 59, of: nextWeek)!

    let iso = ISO8601DateFormatter()

    return [
        Deal(id: "deal-1", product: mockProducts.first(where: { $0.id == "prod-1" })!, endTime: iso.string(from: tomorrow), originalPrice: 1299.99, dealPrice: 1099.99),
        Deal(id: "deal-2", product: mockProducts.first(where: { $0.id == "prod-5" })!, endTime: iso.string(from: tomorrow), originalPrice: 2499.99, dealPrice: 1599.99),
        Deal(id: "deal-3", product: mockProducts.first(where: { $0.id == "prod-16" })!, endTime: iso.string(from: dayAfterTomorrow), originalPrice: 180.0, dealPrice: 139.99),
        Deal(id: "deal-4", product: mockProducts.first(where: { $0.id == "prod-30" })!, endTime: iso.string(from: nextWeek), originalPrice: 27.0, dealPrice: 11.99),
    ]
}()
