import SwiftUI

struct RelatedProductsView: View {
    let product: Product

    private var relatedProducts: [Product] {
        ProductService.getRelatedProducts(for: product)
    }

    var body: some View {
        if !relatedProducts.isEmpty {
            VStack(alignment: .leading, spacing: 12) {
                Text("Related Products")
                    .font(.headline)
                    .padding(.horizontal)

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(relatedProducts) { related in
                            NavigationLink(destination: ProductDetailView(product: related)) {
                                ProductCardView(product: related, compact: true)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal)
                }
            }
        }
    }
}
