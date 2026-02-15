import SwiftUI

struct RecentlyViewedSectionView: View {
    @Environment(RecentlyViewedStore.self) private var store

    var body: some View {
        if !store.items.isEmpty {
            VStack(alignment: .leading, spacing: 12) {
                Text("Recently Viewed")
                    .font(.headline)
                    .padding(.horizontal)

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 12) {
                        ForEach(store.items) { product in
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
}
