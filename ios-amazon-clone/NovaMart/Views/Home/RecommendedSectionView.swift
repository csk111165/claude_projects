import SwiftUI

struct RecommendedSectionView: View {
    @Environment(RecentlyViewedStore.self) private var recentlyViewedStore

    private var recommendations: [Product] {
        if let lastViewed = recentlyViewedStore.items.first {
            return ProductService.getRelatedProducts(for: lastViewed, limit: 6)
        }
        return Array(mockProducts.shuffled().prefix(6))
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Recommended for You")
                .font(.headline)
                .padding(.horizontal)

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    ForEach(recommendations) { product in
                        NavigationLink(destination: ProductDetailView(product: product)) {
                            ProductCardView(product: product, compact: true)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal)
            }
        }
    }
}
