import SwiftUI

struct ShippingFormView: View {
    @Binding var shippingAddress: ShippingAddress
    var onNext: () -> Void
    @Environment(AddressStore.self) private var addressStore
    @State private var useSavedAddress = true
    @State private var errorMessage = ""

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                if !addressStore.addresses.isEmpty {
                    Text("Saved Addresses")
                        .font(.headline)

                    ForEach(addressStore.addresses) { saved in
                        Button {
                            shippingAddress = saved.shippingAddress
                            useSavedAddress = true
                        } label: {
                            HStack {
                                VStack(alignment: .leading, spacing: 2) {
                                    HStack {
                                        Text(saved.label)
                                            .font(.subheadline.bold())
                                        if saved.isDefault {
                                            Text("Default")
                                                .font(.caption2)
                                                .padding(.horizontal, 6)
                                                .padding(.vertical, 2)
                                                .background(Color.novamartOrange.opacity(0.2))
                                                .foregroundStyle(.novamartOrange)
                                                .clipShape(Capsule())
                                        }
                                    }
                                    Text("\(saved.fullName), \(saved.address)")
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                    Text("\(saved.city), \(saved.state) \(saved.zipCode)")
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                                Spacer()
                                Image(systemName: shippingAddress.fullName == saved.fullName && shippingAddress.address == saved.address ? "checkmark.circle.fill" : "circle")
                                    .foregroundStyle(.novamartOrange)
                            }
                            .padding()
                            .background(Color(.systemGray6))
                            .clipShape(RoundedRectangle(cornerRadius: 8))
                        }
                        .buttonStyle(.plain)
                    }

                    Button {
                        useSavedAddress = false
                        shippingAddress = ShippingAddress(fullName: "", address: "", city: "", state: "", zipCode: "", country: "United States", phone: "")
                    } label: {
                        Label("Use a new address", systemImage: "plus.circle")
                            .font(.subheadline)
                    }
                    .padding(.top, 4)
                }

                if addressStore.addresses.isEmpty || !useSavedAddress {
                    Text("Shipping Address")
                        .font(.headline)

                    Group {
                        FormField(title: "Full Name", text: $shippingAddress.fullName, contentType: .name)
                        FormField(title: "Address", text: $shippingAddress.address, contentType: .streetAddressLine1)
                        HStack(spacing: 12) {
                            FormField(title: "City", text: $shippingAddress.city, contentType: .addressCity)
                            FormField(title: "State", text: $shippingAddress.state, contentType: .addressState)
                        }
                        HStack(spacing: 12) {
                            FormField(title: "ZIP Code", text: $shippingAddress.zipCode, contentType: .postalCode, keyboard: .numberPad)
                            FormField(title: "Country", text: $shippingAddress.country, contentType: .countryName)
                        }
                        FormField(title: "Phone", text: $shippingAddress.phone, contentType: .telephoneNumber, keyboard: .phonePad)
                    }
                }

                if !errorMessage.isEmpty {
                    Text(errorMessage)
                        .font(.caption)
                        .foregroundStyle(.red)
                }

                Button {
                    if Validators.isValidShippingAddress(shippingAddress) {
                        errorMessage = ""
                        onNext()
                    } else {
                        errorMessage = "Please fill in all required fields correctly"
                    }
                } label: {
                    Text("Continue to Payment")
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.novamartOrange)
                        .foregroundStyle(.white)
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                }
            }
            .padding()
        }
    }
}

private struct FormField: View {
    let title: String
    @Binding var text: String
    var contentType: UITextContentType?
    var keyboard: UIKeyboardType = .default

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.caption.bold())
            TextField(title, text: $text)
                .textFieldStyle(.roundedBorder)
                .textContentType(contentType)
                .keyboardType(keyboard)
        }
    }
}
