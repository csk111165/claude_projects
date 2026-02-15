import SwiftUI

struct OrderDetailView: View {
    let order: Order
    @Environment(AuthStore.self) private var authStore
    @State private var showCancelConfirmation = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Status
                HStack {
                    Text("Status")
                        .font(.headline)
                    Spacer()
                    OrderStatusBadge(status: order.status)
                }

                // Order Info
                VStack(spacing: 8) {
                    infoRow("Order ID", order.id)
                    infoRow("Date", Formatters.formatDate(order.date))
                    infoRow("Total", Formatters.formatCurrency(order.total))
                    if order.status != .cancelled {
                        infoRow("Est. Delivery", Formatters.deliveryEstimate())
                    }
                }
                .padding()
                .background(Color(.systemGray6))
                .clipShape(RoundedRectangle(cornerRadius: 8))

                // Shipping
                VStack(alignment: .leading, spacing: 6) {
                    Text("Shipping Address")
                        .font(.headline)
                    Text(order.shippingAddress.fullName)
                        .font(.subheadline)
                    Text(order.shippingAddress.address)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("\(order.shippingAddress.city), \(order.shippingAddress.state) \(order.shippingAddress.zipCode)")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                // Items
                VStack(alignment: .leading, spacing: 8) {
                    Text("Items")
                        .font(.headline)
                    ForEach(order.items) { item in
                        HStack(spacing: 10) {
                            AsyncImage(url: URL(string: item.product.images.first ?? "")) { image in
                                image.resizable().aspectRatio(contentMode: .fill)
                            } placeholder: {
                                Color.gray.opacity(0.2)
                            }
                            .frame(width: 60, height: 60)
                            .clipShape(RoundedRectangle(cornerRadius: 6))

                            VStack(alignment: .leading, spacing: 2) {
                                Text(item.product.name)
                                    .font(.subheadline)
                                    .lineLimit(2)
                                Text("Qty: \(item.quantity)")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            Spacer()
                            Text(Formatters.formatCurrency(item.product.price * Double(item.quantity)))
                                .font(.subheadline.bold())
                        }
                        Divider()
                    }
                }

                // Cancel button
                if order.status == .processing {
                    Button(role: .destructive) {
                        showCancelConfirmation = true
                    } label: {
                        Text("Cancel Order")
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.red.opacity(0.1))
                            .foregroundStyle(.red)
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                    }
                }
            }
            .padding()
        }
        .navigationTitle(order.id)
        .navigationBarTitleDisplayMode(.inline)
        .alert("Cancel Order?", isPresented: $showCancelConfirmation) {
            Button("Keep Order", role: .cancel) {}
            Button("Cancel Order", role: .destructive) {
                authStore.cancelOrder(order.id)
            }
        } message: {
            Text("Are you sure you want to cancel this order? This cannot be undone.")
        }
    }

    private func infoRow(_ label: String, _ value: String) -> some View {
        HStack {
            Text(label)
                .font(.subheadline)
                .foregroundStyle(.secondary)
            Spacer()
            Text(value)
                .font(.subheadline.bold())
        }
    }
}
