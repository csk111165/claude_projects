import SwiftUI

struct PaymentMethodFormView: View {
    @Environment(PaymentStore.self) private var paymentStore
    @Environment(\.dismiss) private var dismiss
    @State private var label = ""
    @State private var selectedType: PaymentMethodType = .creditCard
    @State private var cardNumber = ""
    @State private var nameOnCard = ""
    @State private var expiry = ""
    @State private var upiId = ""
    @State private var selectedBank = ""
    @State private var setAsDefault = false
    @State private var errorMessage = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Label") {
                    TextField("e.g. My Visa, Work Card", text: $label)
                }

                Section("Type") {
                    Picker("Payment Type", selection: $selectedType) {
                        ForEach(PaymentMethodType.allCases, id: \.self) { type in
                            Text(type.displayName).tag(type)
                        }
                    }
                    .pickerStyle(.segmented)
                }

                switch selectedType {
                case .creditCard, .debitCard:
                    Section("Card Details") {
                        TextField("Card Number", text: $cardNumber)
                            .keyboardType(.numberPad)
                        TextField("Name on Card", text: $nameOnCard)
                        TextField("Expiry (MM/YY)", text: $expiry)
                            .keyboardType(.numbersAndPunctuation)
                    }
                case .upi:
                    Section("UPI Details") {
                        TextField("UPI ID (e.g. name@upi)", text: $upiId)
                            .keyboardType(.emailAddress)
                            .autocapitalization(.none)
                    }
                case .netBanking:
                    Section("Bank") {
                        ForEach(Constants.bankOptions, id: \.self) { bank in
                            Button {
                                selectedBank = bank
                            } label: {
                                HStack {
                                    Text(bank)
                                        .foregroundStyle(.primary)
                                    Spacer()
                                    if selectedBank == bank {
                                        Image(systemName: "checkmark")
                                            .foregroundStyle(.novamartOrange)
                                    }
                                }
                            }
                        }
                    }
                }

                Section {
                    Toggle("Set as Default", isOn: $setAsDefault)
                }

                if !errorMessage.isEmpty {
                    Section {
                        Text(errorMessage)
                            .foregroundStyle(.red)
                            .font(.caption)
                    }
                }
            }
            .navigationTitle("Add Payment Method")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Save") { saveMethod() }
                        .bold()
                }
            }
        }
    }

    private func saveMethod() {
        guard !label.isEmpty else {
            errorMessage = "Please enter a label"
            return
        }

        switch selectedType {
        case .creditCard, .debitCard:
            guard Validators.isValidCardNumber(cardNumber) else {
                errorMessage = "Invalid card number"
                return
            }
            guard !nameOnCard.isEmpty else {
                errorMessage = "Please enter name on card"
                return
            }
            guard Validators.isValidExpiry(expiry) else {
                errorMessage = "Invalid expiry (use MM/YY)"
                return
            }
            paymentStore.addMethod(selectedType, label: label, cardNumber: cardNumber, nameOnCard: nameOnCard, expiry: expiry, setAsDefault: setAsDefault)
        case .upi:
            guard Validators.isValidUPI(upiId) else {
                errorMessage = "Invalid UPI ID (must contain @)"
                return
            }
            paymentStore.addMethod(selectedType, label: label, upiId: upiId, setAsDefault: setAsDefault)
        case .netBanking:
            guard !selectedBank.isEmpty else {
                errorMessage = "Please select a bank"
                return
            }
            paymentStore.addMethod(selectedType, label: label, bankName: selectedBank, setAsDefault: setAsDefault)
        }
        dismiss()
    }
}
