import SwiftUI

struct WishlistView: View {
    @Environment(WishlistStore.self) private var wishlistStore
    @Environment(CartStore.self) private var cartStore
    let columns = [GridItem(.flexible()), GridItem(.flexible())]

    var body: some View {
        Group {
            if wishlistStore.items.isEmpty {
                EmptyStateView(
                    icon: "heart",
                    title: "Your Wishlist is Empty",
                    message: "Save items you love to your wishlist.",
                    actionTitle: "Start Shopping",
                    action: nil
                )
            } else {
                ScrollView {
                    LazyVGrid(columns: columns, spacing: 12) {
                        ForEach(wishlistStore.items) { product in
                            ZStack(alignment: .topTrailing) {
                                NavigationLink(destination: ProductDetailView(product: product)) {
                                    ProductCardView(product: product)
                                }
                                .buttonStyle(.plain)

                                VStack(spacing: 4) {
                                    Button {
                                        wishlistStore.remove(product.id)
                                    } label: {
                                        Image(systemName: "xmark.circle.fill")
                                            .foregroundStyle(.white, .red)
                                            .font(.title3)
                                    }

                                    if product.inStock {
                                        Button {
                                            cartStore.addItem(product)
                                            wishlistStore.remove(product.id)
                                        } label: {
                                            Image(systemName: "cart.badge.plus")
                                                .foregroundStyle(.white)
                                                .font(.caption)
                                                .padding(6)
                                                .background(Color.novamartOrange)
                                                .clipShape(Circle())
                                        }
                                    }
                                }
                                .padding(6)
                            }
                        }
                    }
                    .padding()
                }
            }
        }
        .navigationTitle("Wishlist (\(wishlistStore.count))")
    }
}
