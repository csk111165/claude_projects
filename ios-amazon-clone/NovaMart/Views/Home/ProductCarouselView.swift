import SwiftUI

struct ProductCarouselView: View {
    let title: String
    let products: [Product]

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(title)
                    .font(.headline)
                Spacer()
                NavigationLink("See All", destination: ProductsListView())
                    .font(.subheadline)
                    .foregroundStyle(.novamartBlue)
            }
            .padding(.horizontal)

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    ForEach(products) { product in
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
