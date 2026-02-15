import SwiftUI

struct OrdersView: View {
    @Environment(AuthStore.self) private var authStore

    var body: some View {
        Group {
            if authStore.orders.isEmpty {
                EmptyStateView(
                    icon: "shippingbox",
                    title: "No Orders Yet",
                    message: "Your order history will appear here.",
                    actionTitle: nil,
                    action: nil
                )
            } else {
                List(authStore.orders) { order in
                    NavigationLink(destination: OrderDetailView(order: order)) {
                        OrderRowView(order: order)
                    }
                }
                .listStyle(.plain)
            }
        }
        .navigationTitle("My Orders")
    }
}

private struct OrderRowView: View {
    let order: Order

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(order.id)
                    .font(.subheadline.bold())
                Spacer()
                OrderStatusBadge(status: order.status)
            }

            Text(Formatters.formatDate(order.date))
                .font(.caption)
                .foregroundStyle(.secondary)

            HStack {
                Text("\(order.items.count) item(s)")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Spacer()
                Text(Formatters.formatCurrency(order.total))
                    .font(.subheadline.bold())
            }
        }
        .padding(.vertical, 4)
    }
}

struct OrderStatusBadge: View {
    let status: OrderStatus

    var color: Color {
        switch status {
        case .processing: return .blue
        case .shipped: return .orange
        case .delivered: return .green
        case .cancelled: return .red
        }
    }

    var body: some View {
        Text(status.rawValue.capitalized)
            .font(.caption2.bold())
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(color.opacity(0.15))
            .foregroundStyle(color)
            .clipShape(Capsule())
    }
}
