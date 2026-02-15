import SwiftUI

struct PaymentFormView: View {
    @Binding var paymentInfo: PaymentInfo
    var onNext: () -> Void
    var onBack: () -> Void
    @Environment(PaymentStore.self) private var paymentStore
    @State private var selectedTab: PaymentMethodType = .creditCard
    @State private var cardNumber = ""
    @State private var nameOnCard = ""
    @State private var expiry = ""
    @State private var cvv = ""
    @State private var upiId = ""
    @State private var selectedBank = ""
    @State private var useSavedMethod = true
    @State private var errorMessage = ""

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                if !paymentStore.methods.isEmpty {
                    Text("Saved Payment Methods")
                        .font(.headline)

                    ForEach(paymentStore.methods) { method in
                        Button {
                            paymentInfo = PaymentInfo(type: method.type, displayText: method.displayText)
                            useSavedMethod = true
                        } label: {
                            HStack {
                                VStack(alignment: .leading, spacing: 2) {
                                    HStack {
                                        Text(method.label)
                                            .font(.subheadline.bold())
                                        if method.isDefault {
                                            Text("Default")
                                                .font(.caption2)
                                                .padding(.horizontal, 6)
                                                .padding(.vertical, 2)
                                                .background(Color.novamartOrange.opacity(0.2))
                                                .foregroundStyle(.novamartOrange)
                                                .clipShape(Capsule())
                                        }
                                    }
                                    Text(method.displayText)
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                                Spacer()
                                Image(systemName: paymentInfo.displayText == method.displayText ? "checkmark.circle.fill" : "circle")
                                    .foregroundStyle(.novamartOrange)
                            }
                            .padding()
                            .background(Color(.systemGray6))
                            .clipShape(RoundedRectangle(cornerRadius: 8))
                        }
                        .buttonStyle(.plain)
                    }

                    Button {
                        useSavedMethod = false
                    } label: {
                        Label("Use a new payment method", systemImage: "plus.circle")
                            .font(.subheadline)
                    }
                    .padding(.top, 4)
                }

                if paymentStore.methods.isEmpty || !useSavedMethod {
                    Text("Payment Method")
                        .font(.headline)

                    Picker("Method", selection: $selectedTab) {
                        ForEach(PaymentMethodType.allCases, id: \.self) { type in
                            Text(type.displayName).tag(type)
                        }
                    }
                    .pickerStyle(.segmented)

                    switch selectedTab {
                    case .creditCard, .debitCard:
                        cardForm
                    case .upi:
                        upiForm
                    case .netBanking:
                        netBankingForm
                    }
                }

                if !errorMessage.isEmpty {
                    Text(errorMessage)
                        .font(.caption)
                        .foregroundStyle(.red)
                }

                HStack(spacing: 12) {
                    Button {
                        onBack()
                    } label: {
                        Text("Back")
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color(.systemGray5))
                            .foregroundStyle(.primary)
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                    }

                    Button {
                        if validateAndSetPayment() {
                            onNext()
                        }
                    } label: {
                        Text("Review Order")
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.novamartOrange)
                            .foregroundStyle(.white)
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                    }
                }
            }
            .padding()
        }
    }

    private var cardForm: some View {
        VStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 4) {
                Text("Card Number").font(.caption.bold())
                TextField("1234 5678 9012 3456", text: $cardNumber)
                    .textFieldStyle(.roundedBorder)
                    .keyboardType(.numberPad)
            }
            VStack(alignment: .leading, spacing: 4) {
                Text("Name on Card").font(.caption.bold())
                TextField("John Doe", text: $nameOnCard)
                    .textFieldStyle(.roundedBorder)
            }
            HStack(spacing: 12) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Expiry (MM/YY)").font(.caption.bold())
                    TextField("MM/YY", text: $expiry)
                        .textFieldStyle(.roundedBorder)
                        .keyboardType(.numbersAndPunctuation)
                }
                VStack(alignment: .leading, spacing: 4) {
                    Text("CVV").font(.caption.bold())
                    SecureField("123", text: $cvv)
                        .textFieldStyle(.roundedBorder)
                        .keyboardType(.numberPad)
                }
            }
        }
    }

    private var upiForm: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("UPI ID").font(.caption.bold())
            TextField("yourname@upi", text: $upiId)
                .textFieldStyle(.roundedBorder)
                .keyboardType(.emailAddress)
                .autocapitalization(.none)
        }
    }

    private var netBankingForm: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Select Bank").font(.caption.bold())
            ForEach(Constants.bankOptions, id: \.self) { bank in
                Button {
                    selectedBank = bank
                } label: {
                    HStack {
                        Text(bank)
                            .font(.subheadline)
                        Spacer()
                        Image(systemName: selectedBank == bank ? "checkmark.circle.fill" : "circle")
                            .foregroundStyle(.novamartOrange)
                    }
                    .padding(.vertical, 6)
                }
                .buttonStyle(.plain)
            }
        }
    }

    private func validateAndSetPayment() -> Bool {
        if useSavedMethod && !paymentInfo.displayText.isEmpty {
            errorMessage = ""
            return true
        }

        switch selectedTab {
        case .creditCard, .debitCard:
            guard Validators.isValidCardNumber(cardNumber) else {
                errorMessage = "Please enter a valid card number"
                return false
            }
            guard !nameOnCard.isEmpty else {
                errorMessage = "Please enter the name on card"
                return false
            }
            guard Validators.isValidExpiry(expiry) else {
                errorMessage = "Please enter a valid expiry date (MM/YY)"
                return false
            }
            guard Validators.isValidCVV(cvv) else {
                errorMessage = "Please enter a valid CVV"
                return false
            }
            let typeName = selectedTab == .creditCard ? "Credit Card" : "Debit Card"
            paymentInfo = PaymentInfo(type: selectedTab, displayText: "\(typeName) ending in \(Formatters.cardLast4(cardNumber))")
        case .upi:
            guard Validators.isValidUPI(upiId) else {
                errorMessage = "Please enter a valid UPI ID (must contain @)"
                return false
            }
            paymentInfo = PaymentInfo(type: .upi, displayText: "UPI - \(upiId)")
        case .netBanking:
            guard !selectedBank.isEmpty else {
                errorMessage = "Please select a bank"
                return false
            }
            paymentInfo = PaymentInfo(type: .netBanking, displayText: "Net Banking - \(selectedBank)")
        }
        errorMessage = ""
        return true
    }
}
