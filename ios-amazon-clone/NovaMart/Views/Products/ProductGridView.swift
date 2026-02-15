import SwiftUI

struct ProductGridView: View {
    let products: [Product]
    let columns = [GridItem(.flexible()), GridItem(.flexible())]

    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 12) {
                ForEach(products) { product in
                    NavigationLink(destination: ProductDetailView(product: product)) {
                        ProductCardView(product: product)
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding()
        }
    }
}
