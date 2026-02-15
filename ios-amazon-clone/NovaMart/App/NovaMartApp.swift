import SwiftUI

@main
struct NovaMartApp: App {
    @State private var authStore = AuthStore()
    @State private var cartStore = CartStore()
    @State private var wishlistStore = WishlistStore()
    @State private var recentlyViewedStore = RecentlyViewedStore()
    @State private var addressStore = AddressStore()
    @State private var paymentStore = PaymentStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(authStore)
                .environment(cartStore)
                .environment(wishlistStore)
                .environment(recentlyViewedStore)
                .environment(addressStore)
                .environment(paymentStore)
        }
    }
}
