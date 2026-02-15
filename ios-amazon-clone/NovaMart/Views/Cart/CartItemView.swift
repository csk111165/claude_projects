import SwiftUI

struct CartItemView: View {
    let item: CartItem
    @Environment(CartStore.self) private var cartStore

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            NavigationLink(destination: ProductDetailView(product: item.product)) {
                AsyncImage(url: URL(string: item.product.images.first ?? "")) { image in
                    image.resizable().aspectRatio(contentMode: .fill)
                } placeholder: {
                    Color.gray.opacity(0.2)
                }
                .frame(width: 90, height: 90)
                .clipShape(RoundedRectangle(cornerRadius: 8))
            }

            VStack(alignment: .leading, spacing: 6) {
                Text(item.product.name)
                    .font(.subheadline)
                    .lineLimit(2)

                Text(Formatters.formatCurrency(item.product.price))
                    .font(.subheadline.bold())
                    .foregroundStyle(.novamartOrange)

                HStack {
                    QuantityStepperView(
                        quantity: Binding(
                            get: { item.quantity },
                            set: { cartStore.updateQuantity(item.product.id, quantity: $0) }
                        )
                    )

                    Spacer()

                    Text(Formatters.formatCurrency(item.product.price * Double(item.quantity)))
                        .font(.subheadline.bold())
                }

                HStack(spacing: 16) {
                    Button {
                        cartStore.saveForLater(item.product.id)
                    } label: {
                        Text("Save for Later")
                            .font(.caption)
                            .foregroundStyle(.novamartBlue)
                    }

                    Button {
                        cartStore.removeItem(item.product.id)
                    } label: {
                        Text("Remove")
                            .font(.caption)
                            .foregroundStyle(.red)
                    }
                }
            }
        }
        .padding(.horizontal)
    }
}
