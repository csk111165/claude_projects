import SwiftUI

struct ProductDetailView: View {
    let product: Product
    @Environment(CartStore.self) private var cartStore
    @Environment(WishlistStore.self) private var wishlistStore
    @Environment(RecentlyViewedStore.self) private var recentlyViewedStore
    @State private var selectedQuantity = 1
    @State private var showAddedToCart = false

    var body: some View {
        VStack(spacing: 0) {
            ScrollView {
                VStack(spacing: 16) {
                    ProductGalleryView(images: product.images)

                    ProductInfoView(product: product)

                    // Quantity selector (when in stock)
                    if product.inStock {
                        HStack {
                            QuantityStepperView(quantity: $selectedQuantity)
                            Spacer()
                            Text(Formatters.formatCurrency(product.price * Double(selectedQuantity)))
                                .font(.title3.bold())
                        }
                        .padding(.horizontal)
                    }

                    // Delivery estimate
                    HStack(spacing: 8) {
                        Image(systemName: "shippingbox")
                            .foregroundStyle(.secondary)
                        VStack(alignment: .leading) {
                            Text(product.price >= Constants.shippingThreshold ? "FREE Shipping" : "Shipping: \(Formatters.formatCurrency(Constants.shippingCost))")
                                .font(.subheadline.bold())
                            Text("Estimated delivery: \(Formatters.deliveryEstimate())")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)

                    ProductSpecsView(specs: product.specs, features: product.features)

                    ProductReviewsView(productId: product.id)

                    RelatedProductsView(product: product)

                    RecentlyViewedSectionView()
                }
                .padding(.bottom, 20)
            }

            // Sticky Add to Cart bar at bottom
            if product.inStock {
                VStack(spacing: 0) {
                    Divider()
                    HStack(spacing: 12) {
                        VStack(alignment: .leading, spacing: 2) {
                            Text(Formatters.formatCurrency(product.price * Double(selectedQuantity)))
                                .font(.headline)
                            Text("Qty: \(selectedQuantity)")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }

                        Button {
                            cartStore.addItem(product, quantity: selectedQuantity)
                            showAddedToCart = true
                            DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                                showAddedToCart = false
                            }
                        } label: {
                            HStack {
                                Image(systemName: showAddedToCart ? "checkmark.circle.fill" : "cart.badge.plus")
                                Text(showAddedToCart ? "Added to Cart!" : "Add to Cart")
                            }
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(showAddedToCart ? .green : Color.novamartOrange)
                            .foregroundStyle(.white)
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                        }
                    }
                    .padding(.horizontal)
                    .padding(.vertical, 10)
                    .background(.ultraThinMaterial)
                }
            } else {
                VStack(spacing: 0) {
                    Divider()
                    Text("Currently Out of Stock")
                        .font(.headline)
                        .foregroundStyle(.red)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color(.systemGray5))
                }
            }
        }
        .navigationTitle(product.name)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    wishlistStore.toggle(product)
                } label: {
                    Image(systemName: wishlistStore.contains(product.id) ? "heart.fill" : "heart")
                        .foregroundStyle(wishlistStore.contains(product.id) ? .red : .primary)
                }
            }
        }
        .onAppear {
            recentlyViewedStore.add(product)
        }
    }
}
