import SwiftUI

struct AccountView: View {
    @Environment(AuthStore.self) private var authStore
    @Environment(CartStore.self) private var cartStore
    @Environment(WishlistStore.self) private var wishlistStore

    var body: some View {
        List {
            Section {
                HStack(spacing: 12) {
                    Image(systemName: "person.circle.fill")
                        .font(.system(size: 50))
                        .foregroundStyle(.novamartOrange)
                    VStack(alignment: .leading) {
                        Text(authStore.user?.name ?? "")
                            .font(.headline)
                        Text(authStore.user?.email ?? "")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
                .padding(.vertical, 4)
            }

            Section("My Orders") {
                NavigationLink {
                    OrdersView()
                } label: {
                    Label {
                        HStack {
                            Text("Orders")
                            Spacer()
                            Text("\(authStore.orders.count)")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    } icon: {
                        Image(systemName: "shippingbox")
                            .foregroundStyle(.novamartOrange)
                    }
                }
            }

            Section("My Addresses") {
                NavigationLink {
                    AddressesView()
                } label: {
                    Label("Shipping Addresses", systemImage: "mappin.and.ellipse")
                        .foregroundStyle(.primary)
                }
            }

            Section("Payment Methods") {
                NavigationLink {
                    PaymentsView()
                } label: {
                    Label("Saved Payments", systemImage: "creditcard")
                        .foregroundStyle(.primary)
                }
            }

            Section("Quick Stats") {
                HStack {
                    StatCard(icon: "cart", title: "Cart", value: "\(cartStore.totalItems)")
                    StatCard(icon: "heart", title: "Wishlist", value: "\(wishlistStore.count)")
                    StatCard(icon: "shippingbox", title: "Orders", value: "\(authStore.orders.count)")
                }
                .listRowInsets(EdgeInsets())
                .listRowBackground(Color.clear)
            }

            Section {
                Button(role: .destructive) {
                    authStore.signOut()
                } label: {
                    Label("Sign Out", systemImage: "rectangle.portrait.and.arrow.right")
                }
            }
        }
        .navigationTitle("My Account")
    }
}

private struct StatCard: View {
    let icon: String
    let title: String
    let value: String

    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundStyle(.novamartOrange)
            Text(value)
                .font(.title3.bold())
            Text(title)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(Color(.systemGray6))
        .clipShape(RoundedRectangle(cornerRadius: 10))
    }
}
