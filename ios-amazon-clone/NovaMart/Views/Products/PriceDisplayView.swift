import SwiftUI

struct PriceDisplayView: View {
    let price: Double
    let originalPrice: Double
    let discount: Int
    var compact: Bool = false

    var body: some View {
        HStack(spacing: 4) {
            Text(Formatters.formatCurrency(price))
                .font(compact ? .caption.bold() : .subheadline.bold())
                .foregroundStyle(.novamartOrange)

            if discount > 0 {
                Text(Formatters.formatCurrency(originalPrice))
                    .font(compact ? .system(size: 10) : .caption)
                    .strikethrough()
                    .foregroundStyle(.secondary)
            }
        }
    }
}
