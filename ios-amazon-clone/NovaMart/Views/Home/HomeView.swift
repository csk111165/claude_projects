import SwiftUI

struct HomeView: View {
    @Environment(CartStore.self) private var cartStore
    @State private var searchText = ""
    @State private var navigateToSearch = false

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                HeroBannerView()

                CategoryGridView()

                DealOfTheDayView()

                ProductCarouselView(
                    title: "Best Sellers",
                    products: ProductService.getBestSellers()
                )

                TrendingGridView()

                ProductCarouselView(
                    title: "Top Rated",
                    products: ProductService.getTopRated()
                )

                RecommendedSectionView()
            }
            .padding(.bottom, 20)
        }
        .navigationTitle("NovaMart")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                NavigationLink(destination: CartView()) {
                    BadgeView(count: cartStore.totalItems) {
                        Image(systemName: "cart")
                    }
                }
            }
        }
    }
}
