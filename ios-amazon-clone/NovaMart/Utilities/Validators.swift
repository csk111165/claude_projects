import Foundation

enum Validators {
    static func isValidEmail(_ email: String) -> Bool {
        email.contains("@") && !email.isEmpty
    }

    static func isValidPassword(_ password: String) -> Bool {
        password.count >= 6
    }

    static func isValidName(_ name: String) -> Bool {
        !name.trimmingCharacters(in: .whitespaces).isEmpty
    }

    static func isValidPhone(_ phone: String) -> Bool {
        let digits = phone.filter { $0.isNumber }
        return digits.count >= 10
    }

    static func isValidZipCode(_ zip: String) -> Bool {
        let digits = zip.filter { $0.isNumber }
        return digits.count == 5 || digits.count == 9
    }

    static func isValidCardNumber(_ number: String) -> Bool {
        let digits = number.filter { $0.isNumber }
        return digits.count >= 13 && digits.count <= 19
    }

    static func isValidExpiry(_ expiry: String) -> Bool {
        // Format: MM/YY
        let parts = expiry.split(separator: "/")
        guard parts.count == 2,
              let month = Int(parts[0]),
              let _ = Int(parts[1]),
              month >= 1, month <= 12,
              parts[1].count == 2 else {
            return false
        }
        return true
    }

    static func isValidCVV(_ cvv: String) -> Bool {
        let digits = cvv.filter { $0.isNumber }
        return digits.count == 3 || digits.count == 4
    }

    static func isValidUPI(_ upiId: String) -> Bool {
        upiId.contains("@") && !upiId.isEmpty
    }

    static func isValidShippingAddress(_ address: ShippingAddress) -> Bool {
        isValidName(address.fullName) &&
        !address.address.trimmingCharacters(in: .whitespaces).isEmpty &&
        !address.city.trimmingCharacters(in: .whitespaces).isEmpty &&
        !address.state.trimmingCharacters(in: .whitespaces).isEmpty &&
        isValidZipCode(address.zipCode) &&
        !address.country.trimmingCharacters(in: .whitespaces).isEmpty &&
        isValidPhone(address.phone)
    }
}
