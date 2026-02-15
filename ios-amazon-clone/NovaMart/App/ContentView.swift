import SwiftUI

struct ContentView: View {
    @Environment(CartStore.self) private var cartStore
    @Environment(AuthStore.self) private var authStore
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            NavigationStack {
                HomeView()
            }
            .tabItem {
                Label("Home", systemImage: "house.fill")
            }
            .tag(0)

            NavigationStack {
                ProductsListView()
            }
            .tabItem {
                Label("Browse", systemImage: "magnifyingglass")
            }
            .tag(1)

            NavigationStack {
                CartView()
            }
            .tabItem {
                Label("Cart", systemImage: "cart.fill")
            }
            .tag(2)
            .badge(cartStore.totalItems)

            NavigationStack {
                WishlistView()
            }
            .tabItem {
                Label("Wishlist", systemImage: "heart.fill")
            }
            .tag(3)

            NavigationStack {
                if authStore.isAuthenticated {
                    AccountView()
                } else {
                    SignInView()
                }
            }
            .tabItem {
                Label("Account", systemImage: "person.fill")
            }
            .tag(4)
        }
        .tint(.novamartOrange)
    }
}
