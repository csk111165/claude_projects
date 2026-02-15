import XCTest
@testable import NovaMart

final class ReviewServiceTests: XCTestCase {
    func testGetReviewsForProduct() {
        let reviews = ReviewService.getReviews(forProductId: "prod-1")
        XCTAssertEqual(reviews.count, 4)
    }

    func testGetReviewsForProductWithNoReviews() {
        let reviews = ReviewService.getReviews(forProductId: "nonexistent")
        XCTAssertTrue(reviews.isEmpty)
    }

    func testAverageRating() {
        let avg = ReviewService.getAverageRating(forProductId: "prod-1")
        // ratings: 5, 4, 5, 2 -> avg = 4.0
        XCTAssertEqual(avg, 4.0, accuracy: 0.01)
    }

    func testRatingDistribution() {
        let dist = ReviewService.getRatingDistribution(forProductId: "prod-1")
        XCTAssertEqual(dist[5], 2)
        XCTAssertEqual(dist[4], 1)
        XCTAssertEqual(dist[2], 1)
    }

    func testSortByMostHelpful() {
        let sorted = ReviewService.getReviewsSorted(forProductId: "prod-1", by: .mostHelpful)
        XCTAssertEqual(sorted.first?.helpful, 42)
    }

    func testTotalReviewCount() {
        XCTAssertEqual(mockReviews.count, 68)
    }
}
