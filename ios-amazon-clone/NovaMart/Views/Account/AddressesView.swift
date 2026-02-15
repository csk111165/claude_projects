import SwiftUI

struct AddressesView: View {
    @Environment(AddressStore.self) private var addressStore
    @State private var showAddForm = false

    var body: some View {
        List {
            ForEach(addressStore.addresses) { address in
                VStack(alignment: .leading, spacing: 4) {
                    HStack {
                        Text(address.label)
                            .font(.subheadline.bold())
                        if address.isDefault {
                            Text("Default")
                                .font(.caption2)
                                .padding(.horizontal, 6)
                                .padding(.vertical, 2)
                                .background(Color.novamartOrange.opacity(0.2))
                                .foregroundStyle(.novamartOrange)
                                .clipShape(Capsule())
                        }
                        Spacer()
                    }
                    Text(address.fullName)
                        .font(.subheadline)
                    Text(address.address)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("\(address.city), \(address.state) \(address.zipCode)")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text(address.phone)
                        .font(.caption)
                        .foregroundStyle(.secondary)

                    HStack(spacing: 16) {
                        if !address.isDefault {
                            Button("Set as Default") {
                                addressStore.setDefault(address.id)
                            }
                            .font(.caption)
                            .foregroundStyle(.novamartBlue)
                        }

                        Button("Delete", role: .destructive) {
                            addressStore.removeAddress(address.id)
                        }
                        .font(.caption)
                    }
                    .padding(.top, 4)
                }
                .padding(.vertical, 4)
            }
        }
        .listStyle(.plain)
        .overlay {
            if addressStore.addresses.isEmpty {
                EmptyStateView(
                    icon: "mappin.and.ellipse",
                    title: "No Addresses",
                    message: "Add a shipping address to get started.",
                    actionTitle: "Add Address",
                    action: { showAddForm = true }
                )
            }
        }
        .navigationTitle("Addresses")
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    showAddForm = true
                } label: {
                    Image(systemName: "plus")
                }
            }
        }
        .sheet(isPresented: $showAddForm) {
            AddressFormView()
        }
    }
}
