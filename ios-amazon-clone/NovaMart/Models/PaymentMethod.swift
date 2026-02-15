import Foundation

enum PaymentMethodType: String, Codable, Hashable, CaseIterable {
    case creditCard = "credit_card"
    case debitCard = "debit_card"
    case upi = "upi"
    case netBanking = "net_banking"

    var displayName: String {
        switch self {
        case .creditCard: return "Credit Card"
        case .debitCard: return "Debit Card"
        case .upi: return "UPI"
        case .netBanking: return "Net Banking"
        }
    }
}

struct SavedPaymentMethod: Codable, Identifiable, Hashable {
    let id: String
    var type: PaymentMethodType
    var label: String
    var isDefault: Bool
    // Credit/Debit card fields
    var cardNumber: String?
    var cardLast4: String?
    var nameOnCard: String?
    var expiry: String?
    // UPI fields
    var upiId: String?
    // Net Banking fields
    var bankName: String?

    var displayText: String {
        switch type {
        case .creditCard:
            return "Credit Card ending in \(cardLast4 ?? "****")"
        case .debitCard:
            return "Debit Card ending in \(cardLast4 ?? "****")"
        case .upi:
            return "UPI - \(upiId ?? "")"
        case .netBanking:
            return "Net Banking - \(bankName ?? "")"
        }
    }
}

struct PaymentInfo: Codable, Hashable {
    let type: PaymentMethodType
    let displayText: String
}
