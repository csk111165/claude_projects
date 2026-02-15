import SwiftUI

struct TrendingGridView: View {
    let products = ProductService.getTrendingProducts(limit: 4)
    let columns = [GridItem(.flexible()), GridItem(.flexible())]

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Trending Now")
                    .font(.headline)
                Image(systemName: "chart.line.uptrend.xyaxis")
                    .foregroundStyle(.novamartOrange)
            }
            .padding(.horizontal)

            LazyVGrid(columns: columns, spacing: 12) {
                ForEach(products) { product in
                    NavigationLink(destination: ProductDetailView(product: product)) {
                        ProductCardView(product: product)
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.horizontal)
        }
    }
}
