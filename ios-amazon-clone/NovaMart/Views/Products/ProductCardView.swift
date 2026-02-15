import SwiftUI

struct ProductCardView: View {
    let product: Product
    var compact: Bool = false
    @Environment(WishlistStore.self) private var wishlistStore
    @Environment(CartStore.self) private var cartStore
    @State private var addedToCart = false

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            ZStack(alignment: .topTrailing) {
                AsyncImage(url: URL(string: product.images.first ?? "")) { image in
                    image.resizable().aspectRatio(contentMode: .fill)
                } placeholder: {
                    Color.gray.opacity(0.2)
                }
                .frame(height: compact ? 120 : 150)
                .clipped()

                if product.discount > 0 {
                    Text("-\(product.discount)%")
                        .font(.caption2.bold())
                        .padding(.horizontal, 6)
                        .padding(.vertical, 3)
                        .background(.red)
                        .foregroundStyle(.white)
                        .clipShape(RoundedRectangle(cornerRadius: 4))
                        .padding(6)
                }
            }

            VStack(alignment: .leading, spacing: 4) {
                Text(product.name)
                    .font(.caption)
                    .lineLimit(2)
                    .foregroundStyle(.primary)

                if !compact {
                    RatingStarsView(rating: product.rating, size: 10)
                }

                PriceDisplayView(price: product.price, originalPrice: product.originalPrice, discount: product.discount, compact: compact)

                if !product.inStock {
                    Text("Out of Stock")
                        .font(.caption2)
                        .foregroundStyle(.red)
                } else {
                    Button {
                        cartStore.addItem(product)
                        addedToCart = true
                        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                            addedToCart = false
                        }
                    } label: {
                        HStack(spacing: 4) {
                            Image(systemName: addedToCart ? "checkmark" : "cart.badge.plus")
                                .font(.caption2)
                            Text(addedToCart ? "Added!" : "Add to Cart")
                                .font(.caption2.bold())
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 6)
                        .background(addedToCart ? .green : Color.novamartOrange)
                        .foregroundStyle(.white)
                        .clipShape(RoundedRectangle(cornerRadius: 6))
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.horizontal, 8)
            .padding(.bottom, 8)
        }
        .frame(width: compact ? 150 : nil)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .shadow(color: .black.opacity(0.08), radius: 4, y: 2)
    }
}
