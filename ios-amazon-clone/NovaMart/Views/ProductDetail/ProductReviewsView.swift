import SwiftUI

struct ProductReviewsView: View {
    let productId: String
    @State private var sortOption: ReviewSortOption = .mostRecent
    @State private var showAll = false

    private var reviews: [Review] {
        ReviewService.getReviewsSorted(forProductId: productId, by: sortOption)
    }

    private var displayedReviews: [Review] {
        showAll ? reviews : Array(reviews.prefix(3))
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Customer Reviews")
                    .font(.headline)
                Spacer()
                if !reviews.isEmpty {
                    Menu {
                        ForEach(ReviewSortOption.allCases, id: \.self) { option in
                            Button(option.rawValue) { sortOption = option }
                        }
                    } label: {
                        Label("Sort", systemImage: "arrow.up.arrow.down")
                            .font(.caption)
                    }
                }
            }

            if reviews.isEmpty {
                Text("No reviews yet.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            } else {
                // Rating distribution
                let distribution = ReviewService.getRatingDistribution(forProductId: productId)
                let totalReviews = reviews.count

                VStack(spacing: 4) {
                    ForEach((1...5).reversed(), id: \.self) { star in
                        HStack(spacing: 8) {
                            Text("\(star)")
                                .font(.caption)
                                .frame(width: 12)
                            Image(systemName: "star.fill")
                                .font(.system(size: 10))
                                .foregroundStyle(.yellow)
                            GeometryReader { geo in
                                ZStack(alignment: .leading) {
                                    RoundedRectangle(cornerRadius: 2)
                                        .fill(Color(.systemGray5))
                                    RoundedRectangle(cornerRadius: 2)
                                        .fill(Color.novamartOrange)
                                        .frame(width: geo.size.width * CGFloat(distribution[star] ?? 0) / CGFloat(max(totalReviews, 1)))
                                }
                            }
                            .frame(height: 8)
                            Text("\(distribution[star] ?? 0)")
                                .font(.caption2)
                                .foregroundStyle(.secondary)
                                .frame(width: 20)
                        }
                    }
                }
                .padding(.bottom, 8)

                ForEach(displayedReviews) { review in
                    ReviewCardView(review: review)
                }

                if reviews.count > 3 {
                    Button(showAll ? "Show Less" : "See All \(reviews.count) Reviews") {
                        showAll.toggle()
                    }
                    .font(.subheadline)
                    .foregroundStyle(.novamartBlue)
                }
            }
        }
        .padding(.horizontal)
    }
}
