import SwiftUI

struct SaveForLaterView: View {
    @Environment(CartStore.self) private var cartStore

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Saved for Later (\(cartStore.savedItems.count))")
                .font(.headline)
                .padding(.horizontal)

            ForEach(cartStore.savedItems) { item in
                HStack(spacing: 12) {
                    AsyncImage(url: URL(string: item.product.images.first ?? "")) { image in
                        image.resizable().aspectRatio(contentMode: .fill)
                    } placeholder: {
                        Color.gray.opacity(0.2)
                    }
                    .frame(width: 70, height: 70)
                    .clipShape(RoundedRectangle(cornerRadius: 8))

                    VStack(alignment: .leading, spacing: 4) {
                        Text(item.product.name)
                            .font(.subheadline)
                            .lineLimit(2)
                        Text(Formatters.formatCurrency(item.product.price))
                            .font(.subheadline.bold())
                            .foregroundStyle(.novamartOrange)

                        HStack(spacing: 16) {
                            Button {
                                cartStore.moveToCart(item.product.id)
                            } label: {
                                Text("Move to Cart")
                                    .font(.caption)
                                    .foregroundStyle(.novamartBlue)
                            }
                            Button {
                                cartStore.removeSavedItem(item.product.id)
                            } label: {
                                Text("Remove")
                                    .font(.caption)
                                    .foregroundStyle(.red)
                            }
                        }
                    }
                    Spacer()
                }
                .padding(.horizontal)
            }
        }
    }
}
