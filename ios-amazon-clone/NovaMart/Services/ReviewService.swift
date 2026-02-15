import Foundation

enum ReviewService {
    static func getReviews(forProductId productId: String) -> [Review] {
        mockReviews.filter { $0.productId == productId }
    }

    static func getAverageRating(forProductId productId: String) -> Double {
        let reviews = getReviews(forProductId: productId)
        guard !reviews.isEmpty else { return 0 }
        let sum = reviews.reduce(0) { $0 + $1.rating }
        return Double(sum) / Double(reviews.count)
    }

    static func getRatingDistribution(forProductId productId: String) -> [Int: Int] {
        let reviews = getReviews(forProductId: productId)
        var distribution: [Int: Int] = [1: 0, 2: 0, 3: 0, 4: 0, 5: 0]
        for review in reviews {
            distribution[review.rating, default: 0] += 1
        }
        return distribution
    }

    static func getReviewsSorted(forProductId productId: String, by sortOption: ReviewSortOption = .mostRecent) -> [Review] {
        let reviews = getReviews(forProductId: productId)
        switch sortOption {
        case .mostRecent:
            return reviews.sorted { $0.date > $1.date }
        case .mostHelpful:
            return reviews.sorted { $0.helpful > $1.helpful }
        case .highestRating:
            return reviews.sorted { $0.rating > $1.rating }
        case .lowestRating:
            return reviews.sorted { $0.rating < $1.rating }
        }
    }
}

enum ReviewSortOption: String, CaseIterable {
    case mostRecent = "Most Recent"
    case mostHelpful = "Most Helpful"
    case highestRating = "Highest Rating"
    case lowestRating = "Lowest Rating"
}
