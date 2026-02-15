import Foundation
import Observation

@Observable
final class PaymentStore {
    var methods: [SavedPaymentMethod] = []
    var defaultMethodId: String?

    init() {
        self.methods = PersistenceService.load([SavedPaymentMethod].self, forKey: PersistenceService.Keys.paymentMethods) ?? []
        self.defaultMethodId = UserDefaults.standard.string(forKey: PersistenceService.Keys.defaultPaymentId)
    }

    var defaultMethod: SavedPaymentMethod? {
        methods.first { $0.id == defaultMethodId }
    }

    func addMethod(_ type: PaymentMethodType, label: String, cardNumber: String? = nil, nameOnCard: String? = nil, expiry: String? = nil, upiId: String? = nil, bankName: String? = nil, setAsDefault: Bool = false) {
        let id = Helpers.generateId()
        let isFirst = methods.isEmpty
        let shouldBeDefault = setAsDefault || isFirst

        if shouldBeDefault {
            for i in methods.indices {
                methods[i].isDefault = false
            }
        }

        var cardLast4: String?
        var maskedNumber: String?
        if let cardNumber {
            cardLast4 = Formatters.cardLast4(cardNumber)
            maskedNumber = Formatters.maskCardNumber(cardNumber)
        }

        let method = SavedPaymentMethod(
            id: id,
            type: type,
            label: label,
            isDefault: shouldBeDefault,
            cardNumber: maskedNumber,
            cardLast4: cardLast4,
            nameOnCard: nameOnCard,
            expiry: expiry,
            upiId: upiId,
            bankName: bankName
        )
        methods.append(method)

        if shouldBeDefault {
            defaultMethodId = id
        }
        persist()
    }

    func removeMethod(_ id: String) {
        let wasDefault = defaultMethodId == id
        methods.removeAll { $0.id == id }

        if wasDefault {
            let newDefaultId = methods.first?.id
            defaultMethodId = newDefaultId
            for i in methods.indices {
                methods[i].isDefault = methods[i].id == newDefaultId
            }
        }
        persist()
    }

    func setDefault(_ id: String) {
        defaultMethodId = id
        for i in methods.indices {
            methods[i].isDefault = methods[i].id == id
        }
        persist()
    }

    private func persist() {
        PersistenceService.save(methods, forKey: PersistenceService.Keys.paymentMethods)
        if let defaultMethodId {
            UserDefaults.standard.set(defaultMethodId, forKey: PersistenceService.Keys.defaultPaymentId)
        } else {
            UserDefaults.standard.removeObject(forKey: PersistenceService.Keys.defaultPaymentId)
        }
    }
}
