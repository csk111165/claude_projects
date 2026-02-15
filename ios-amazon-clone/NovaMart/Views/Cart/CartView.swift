import SwiftUI

struct CartView: View {
    @Environment(CartStore.self) private var cartStore
    @Environment(AuthStore.self) private var authStore

    var body: some View {
        Group {
            if cartStore.items.isEmpty {
                EmptyStateView(
                    icon: "cart",
                    title: "Your Cart is Empty",
                    message: "Looks like you haven't added anything to your cart yet.",
                    actionTitle: "Start Shopping",
                    action: nil
                )
            } else {
                ScrollView {
                    VStack(spacing: 16) {
                        ForEach(cartStore.items) { item in
                            CartItemView(item: item)
                        }

                        CartSummaryView()

                        NavigationLink {
                            if authStore.isAuthenticated {
                                CheckoutView()
                            } else {
                                SignInView(redirectToCheckout: true)
                            }
                        } label: {
                            Text("Proceed to Checkout")
                                .font(.headline)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.novamartOrange)
                                .foregroundStyle(.white)
                                .clipShape(RoundedRectangle(cornerRadius: 10))
                        }
                        .padding(.horizontal)

                        if !cartStore.savedItems.isEmpty {
                            SaveForLaterView()
                        }
                    }
                    .padding(.vertical)
                }
            }
        }
        .navigationTitle("Shopping Cart")
    }
}
