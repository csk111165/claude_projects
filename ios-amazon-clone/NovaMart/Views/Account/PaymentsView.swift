import SwiftUI

struct PaymentsView: View {
    @Environment(PaymentStore.self) private var paymentStore
    @State private var showAddForm = false

    var body: some View {
        List {
            ForEach(paymentStore.methods) { method in
                VStack(alignment: .leading, spacing: 4) {
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
                        Spacer()
                    }

                    Text(method.type.displayName)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text(method.displayText)
                        .font(.caption)
                        .foregroundStyle(.secondary)

                    HStack(spacing: 16) {
                        if !method.isDefault {
                            Button("Set as Default") {
                                paymentStore.setDefault(method.id)
                            }
                            .font(.caption)
                            .foregroundStyle(.novamartBlue)
                        }

                        Button("Delete", role: .destructive) {
                            paymentStore.removeMethod(method.id)
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
            if paymentStore.methods.isEmpty {
                EmptyStateView(
                    icon: "creditcard",
                    title: "No Payment Methods",
                    message: "Add a payment method to get started.",
                    actionTitle: "Add Payment",
                    action: { showAddForm = true }
                )
            }
        }
        .navigationTitle("Payment Methods")
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
            PaymentMethodFormView()
        }
    }
}
