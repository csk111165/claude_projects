import SwiftUI

struct OrderReviewView: View {
    let shippingAddress: ShippingAddress
    let paymentInfo: PaymentInfo
    var onPlaceOrder: () -> Void
    var onBack: () -> Void
    @Environment(CartStore.self) private var cartStore

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Shipping
                VStack(alignment: .leading, spacing: 6) {
                    Text("Shipping Address")
                        .font(.headline)
                    Text(shippingAddress.fullName)
                        .font(.subheadline)
                    Text(shippingAddress.address)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("\(shippingAddress.city), \(shippingAddress.state) \(shippingAddress.zipCode)")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text(shippingAddress.phone)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .padding()
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color(.systemGray6))
                .clipShape(RoundedRectangle(cornerRadius: 8))

                // Payment
                VStack(alignment: .leading, spacing: 6) {
                    Text("Payment Method")
                        .font(.headline)
                    Text(paymentInfo.displayText)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                .padding()
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color(.systemGray6))
                .clipShape(RoundedRectangle(cornerRadius: 8))

                // Delivery
                VStack(alignment: .leading, spacing: 6) {
                    Text("Estimated Delivery")
                        .font(.headline)
                    Text(Formatters.deliveryEstimate())
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                .padding()
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color(.systemGray6))
                .clipShape(RoundedRectangle(cornerRadius: 8))

                // Items
                VStack(alignment: .leading, spacing: 8) {
                    Text("Order Items (\(cartStore.totalItems))")
                        .font(.headline)

                    ForEach(cartStore.items) { item in
                        HStack(spacing: 10) {
                            AsyncImage(url: URL(string: item.product.images.first ?? "")) { image in
                                image.resizable().aspectRatio(contentMode: .fill)
                            } placeholder: {
                                Color.gray.opacity(0.2)
                            }
                            .frame(width: 50, height: 50)
                            .clipShape(RoundedRectangle(cornerRadius: 6))

                            VStack(alignment: .leading) {
                                Text(item.product.name)
                                    .font(.caption)
                                    .lineLimit(1)
                                Text("Qty: \(item.quantity)")
                                    .font(.caption2)
                                    .foregroundStyle(.secondary)
                            }
                            Spacer()
                            Text(Formatters.formatCurrency(item.product.price * Double(item.quantity)))
                                .font(.caption.bold())
                        }
                    }
                }

                CartSummaryView()

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
                        onPlaceOrder()
                    } label: {
                        Text("Place Order")
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
}
