import SwiftUI

struct ProductInfoView: View {
    let product: Product

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(product.brand)
                .font(.caption)
                .foregroundStyle(.secondary)

            Text(product.name)
                .font(.title3.bold())

            HStack(spacing: 8) {
                RatingStarsView(rating: product.rating, size: 14, showCount: product.reviewCount)
            }

            HStack(alignment: .firstTextBaseline, spacing: 8) {
                Text(Formatters.formatCurrency(product.price))
                    .font(.title2.bold())
                    .foregroundStyle(.novamartOrange)

                if product.discount > 0 {
                    Text(Formatters.formatCurrency(product.originalPrice))
                        .font(.subheadline)
                        .strikethrough()
                        .foregroundStyle(.secondary)

                    Text("\(product.discount)% off")
                        .font(.subheadline.bold())
                        .foregroundStyle(.green)
                }
            }

            if product.inStock {
                Label("In Stock", systemImage: "checkmark.circle.fill")
                    .font(.subheadline)
                    .foregroundStyle(.green)
            } else {
                Label("Out of Stock", systemImage: "xmark.circle.fill")
                    .font(.subheadline)
                    .foregroundStyle(.red)
            }

            Text(product.description)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .padding(.top, 4)
        }
        .padding(.horizontal)
    }
}
