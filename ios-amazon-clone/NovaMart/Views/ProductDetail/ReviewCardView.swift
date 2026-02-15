import SwiftUI

struct ReviewCardView: View {
    let review: Review

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(review.userName)
                    .font(.subheadline.bold())
                Spacer()
                Text(Formatters.formatDate(review.date))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            RatingStarsView(rating: Double(review.rating), size: 12)

            Text(review.title)
                .font(.subheadline.bold())

            Text(review.comment)
                .font(.caption)
                .foregroundStyle(.secondary)

            if review.helpful > 0 {
                Text("\(review.helpful) people found this helpful")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }

            Divider()
        }
        .padding(.vertical, 4)
    }
}
