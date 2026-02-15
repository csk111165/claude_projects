import SwiftUI

struct CheckoutView: View {
    @Environment(CartStore.self) private var cartStore
    @Environment(AuthStore.self) private var authStore
    @Environment(AddressStore.self) private var addressStore
    @Environment(PaymentStore.self) private var paymentStore
    @State private var currentStep = 0
    @State private var shippingAddress = ShippingAddress(fullName: "", address: "", city: "", state: "", zipCode: "", country: "United States", phone: "")
    @State private var paymentInfo = PaymentInfo(type: .creditCard, displayText: "")
    @State private var orderPlaced = false
    @State private var placedOrder: Order?

    var body: some View {
        if let order = placedOrder, orderPlaced {
            OrderConfirmationView(order: order)
        } else {
            VStack(spacing: 0) {
                CheckoutStepsView(currentStep: currentStep)
                    .padding()

                TabView(selection: $currentStep) {
                    ShippingFormView(
                        shippingAddress: $shippingAddress,
                        onNext: { currentStep = 1 }
                    )
                    .tag(0)

                    PaymentFormView(
                        paymentInfo: $paymentInfo,
                        onNext: { currentStep = 2 },
                        onBack: { currentStep = 0 }
                    )
                    .tag(1)

                    OrderReviewView(
                        shippingAddress: shippingAddress,
                        paymentInfo: paymentInfo,
                        onPlaceOrder: placeOrder,
                        onBack: { currentStep = 1 }
                    )
                    .tag(2)
                }
                .tabViewStyle(.page(indexDisplayMode: .never))
                .animation(.easeInOut, value: currentStep)
            }
            .navigationTitle("Checkout")
            .navigationBarTitleDisplayMode(.inline)
            .onAppear {
                if let defaultAddr = addressStore.defaultAddress {
                    shippingAddress = defaultAddr.shippingAddress
                }
            }
        }
    }

    private func placeOrder() {
        let order = Order(
            id: "ORD-\(Helpers.generateId().uppercased())",
            items: cartStore.items,
            total: cartStore.total,
            status: .processing,
            date: ISO8601DateFormatter().string(from: Date()),
            shippingAddress: shippingAddress
        )
        authStore.addOrder(order)
        cartStore.clearCart()
        placedOrder = order
        orderPlaced = true
    }
}
