import SwiftUI

struct OrderConfirmationView: View {
    let order: Order

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                Image(systemName: "checkmark.circle.fill")
                    .font(.system(size: 80))
                    .foregroundStyle(.green)
                    .padding(.top, 40)

                Text("Order Placed!")
                    .font(.title.bold())

                Text("Thank you for your order")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                VStack(spacing: 12) {
                    infoRow(label: "Order ID", value: order.id)
                    infoRow(label: "Date", value: Formatters.formatDate(order.date))
                    infoRow(label: "Total", value: Formatters.formatCurrency(order.total))
                    infoRow(label: "Status", value: order.status.rawValue.capitalized)
                    infoRow(label: "Estimated Delivery", value: Formatters.deliveryEstimate())
                }
                .padding()
                .background(Color(.systemGray6))
                .clipShape(RoundedRectangle(cornerRadius: 10))
                .padding(.horizontal)

                VStack(alignment: .leading, spacing: 8) {
                    Text("Shipping To")
                        .font(.headline)
                    Text(order.shippingAddress.fullName)
                        .font(.subheadline)
                    Text("\(order.shippingAddress.address), \(order.shippingAddress.city)")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("\(order.shippingAddress.state) \(order.shippingAddress.zipCode)")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal)

                VStack(alignment: .leading, spacing: 8) {
                    Text("Items Ordered")
                        .font(.headline)
                    ForEach(order.items) { item in
                        HStack {
                            Text(item.product.name)
                                .font(.caption)
                                .lineLimit(1)
                            Spacer()
                            Text("x\(item.quantity)")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                            Text(Formatters.formatCurrency(item.product.price * Double(item.quantity)))
                                .font(.caption.bold())
                        }
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal)
            }
            .padding(.bottom, 40)
        }
        .navigationBarBackButtonHidden()
    }

    private func infoRow(label: String, value: String) -> some View {
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
