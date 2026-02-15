import SwiftUI

struct DealOfTheDayView: View {
    let deals = mockDeals

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Deals of the Day")
                    .font(.headline)
                Image(systemName: "flame.fill")
                    .foregroundStyle(.red)
            }
            .padding(.horizontal)

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    ForEach(deals) { deal in
                        NavigationLink(destination: ProductDetailView(product: deal.product)) {
                            DealCardView(deal: deal)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal)
            }
        }
    }
}

private struct DealCardView: View {
    let deal: Deal

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            ZStack(alignment: .topTrailing) {
                AsyncImage(url: URL(string: deal.product.images.first ?? "")) { image in
                    image.resizable().aspectRatio(contentMode: .fill)
                } placeholder: {
                    Color.gray.opacity(0.2)
                }
                .frame(width: 160, height: 120)
                .clipped()

                Text("\(deal.discountPercentage)% OFF")
                    .font(.caption2.bold())
                    .padding(.horizontal, 6)
                    .padding(.vertical, 3)
                    .background(.red)
                    .foregroundStyle(.white)
                    .clipShape(RoundedRectangle(cornerRadius: 4))
                    .padding(6)
            }

            VStack(alignment: .leading, spacing: 4) {
                Text(deal.product.name)
                    .font(.caption)
                    .lineLimit(2)

                HStack(spacing: 4) {
                    Text(Formatters.formatCurrency(deal.dealPrice))
                        .font(.subheadline.bold())
                        .foregroundStyle(.novamartOrange)
                    Text(Formatters.formatCurrency(deal.originalPrice))
                        .font(.caption)
                        .strikethrough()
                        .foregroundStyle(.secondary)
                }

                CountdownTimerView(targetDate: deal.endDate)
            }
            .padding(.horizontal, 8)
            .padding(.bottom, 8)
        }
        .frame(width: 160)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .shadow(color: .black.opacity(0.08), radius: 4, y: 2)
    }
}
