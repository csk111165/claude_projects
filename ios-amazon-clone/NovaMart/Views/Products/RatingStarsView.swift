import SwiftUI

struct RatingStarsView: View {
    let rating: Double
    var size: CGFloat = 14
    var showCount: Int?

    var body: some View {
        HStack(spacing: 2) {
            ForEach(1...5, id: \.self) { star in
                Image(systemName: starImage(for: star))
                    .font(.system(size: size))
                    .foregroundStyle(star <= Int(rating.rounded(.down)) ? .yellow : (Double(star) - 0.5 <= rating ? .yellow : .gray.opacity(0.3)))
            }
            if let count = showCount {
                Text("(\(count))")
                    .font(.system(size: size - 2))
                    .foregroundStyle(.secondary)
            }
        }
    }

    private func starImage(for star: Int) -> String {
        let fullStars = Int(rating.rounded(.down))
        let hasHalfStar = rating - Double(fullStars) >= 0.25

        if star <= fullStars {
            return "star.fill"
        } else if star == fullStars + 1 && hasHalfStar {
            return "star.leadinghalf.filled"
        } else {
            return "star"
        }
    }
}
