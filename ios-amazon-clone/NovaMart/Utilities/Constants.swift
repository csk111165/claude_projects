import Foundation

struct SortOption: Identifiable {
    let id: String
    let value: String
    let label: String

    init(_ value: String, _ label: String) {
        self.id = value
        self.value = value
        self.label = label
    }
}

struct PriceRange: Identifiable {
    let id: String
    let label: String
    let min: Double
    let max: Double

    init(_ label: String, _ min: Double, _ max: Double) {
        self.id = label
        self.label = label
        self.min = min
        self.max = max
    }
}

enum Constants {
    static let siteName = "NovaMart"
    static let siteDescription = "Everything you need, delivered to your door"

    // Pricing
    static let shippingThreshold: Double = 35.0
    static let shippingCost: Double = 5.99
    static let taxRate: Double = 0.08

    // Recently Viewed
    static let maxRecentlyViewed = 12

    // Sort Options
    static let sortOptions: [SortOption] = [
        SortOption("featured", "Featured"),
        SortOption("price-asc", "Price: Low to High"),
        SortOption("price-desc", "Price: High to Low"),
        SortOption("rating", "Avg. Customer Review"),
        SortOption("newest", "Newest Arrivals")
    ]

    // Price Ranges
    static let priceRanges: [PriceRange] = [
        PriceRange("Under $25", 0, 25),
        PriceRange("$25 to $50", 25, 50),
        PriceRange("$50 to $100", 50, 100),
        PriceRange("$100 to $200", 100, 200),
        PriceRange("$200 & Above", 200, .infinity)
    ]

    // Rating Filters
    static let ratingFilters = [4, 3, 2, 1]

    // Colors (hex strings for reference)
    enum Colors {
        static let navyDark = "#131921"
        static let navyLight = "#232F3E"
        static let orange = "#FF9900"
        static let orangeHover = "#FFa31a"
        static let blue = "#146EB4"
    }

    // Category slugs
    static let categorySlugs = [
        "electronics", "clothing", "home-kitchen", "books",
        "sports-outdoors", "beauty", "toys-games", "automotive"
    ]

    // Net Banking options
    static let bankOptions = [
        "State Bank of India",
        "HDFC Bank",
        "ICICI Bank",
        "Axis Bank",
        "Punjab National Bank",
        "Bank of Baroda",
        "Kotak Mahindra Bank",
        "Yes Bank"
    ]
}
