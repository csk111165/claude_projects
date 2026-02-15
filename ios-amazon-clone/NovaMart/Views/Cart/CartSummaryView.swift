import SwiftUI

struct CartSummaryView: View {
    @Environment(CartStore.self) private var cartStore

    var body: some View {
        VStack(spacing: 8) {
            Divider()

            HStack {
                Text("Subtotal (\(cartStore.totalItems) items)")
                    .font(.subheadline)
                Spacer()
                Text(Formatters.formatCurrency(cartStore.subtotal))
                    .font(.subheadline)
            }

            HStack {
                Text("Shipping")
                    .font(.subheadline)
                Spacer()
                if cartStore.shipping == 0 {
                    Text("FREE")
                        .font(.subheadline.bold())
                        .foregroundStyle(.green)
                } else {
                    Text(Formatters.formatCurrency(cartStore.shipping))
                        .font(.subheadline)
                }
            }

            if cartStore.shipping > 0 {
                Text("Add \(Formatters.formatCurrency(Constants.shippingThreshold - cartStore.subtotal)) more for FREE shipping")
                    .font(.caption)
                    .foregroundStyle(.novamartBlue)
            }

            HStack {
                Text("Tax (8%)")
                    .font(.subheadline)
                Spacer()
                Text(Formatters.formatCurrency(cartStore.tax))
                    .font(.subheadline)
            }

            Divider()

            HStack {
                Text("Order Total")
                    .font(.headline)
                Spacer()
                Text(Formatters.formatCurrency(cartStore.total))
                    .font(.headline)
                    .foregroundStyle(.novamartOrange)
            }
        }
        .padding(.horizontal)
    }
}
