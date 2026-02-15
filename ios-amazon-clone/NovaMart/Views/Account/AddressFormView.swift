import SwiftUI

struct AddressFormView: View {
    @Environment(AddressStore.self) private var addressStore
    @Environment(\.dismiss) private var dismiss
    @State private var label = ""
    @State private var fullName = ""
    @State private var address = ""
    @State private var city = ""
    @State private var state = ""
    @State private var zipCode = ""
    @State private var country = "United States"
    @State private var phone = ""
    @State private var setAsDefault = false
    @State private var errorMessage = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Address Label") {
                    TextField("e.g. Home, Office", text: $label)
                }

                Section("Address Details") {
                    TextField("Full Name", text: $fullName)
                        .textContentType(.name)
                    TextField("Street Address", text: $address)
                        .textContentType(.streetAddressLine1)
                    TextField("City", text: $city)
                        .textContentType(.addressCity)
                    TextField("State", text: $state)
                        .textContentType(.addressState)
                    TextField("ZIP Code", text: $zipCode)
                        .textContentType(.postalCode)
                        .keyboardType(.numberPad)
                    TextField("Country", text: $country)
                        .textContentType(.countryName)
                    TextField("Phone", text: $phone)
                        .textContentType(.telephoneNumber)
                        .keyboardType(.phonePad)
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
            .navigationTitle("Add Address")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Save") { saveAddress() }
                        .bold()
                }
            }
        }
    }

    private func saveAddress() {
        guard !label.isEmpty else {
            errorMessage = "Please enter a label"
            return
        }
        let shippingAddr = ShippingAddress(fullName: fullName, address: address, city: city, state: state, zipCode: zipCode, country: country, phone: phone)
        guard Validators.isValidShippingAddress(shippingAddr) else {
            errorMessage = "Please fill in all fields correctly"
            return
        }
        addressStore.addAddress(shippingAddr, label: label, setAsDefault: setAsDefault)
        dismiss()
    }
}
