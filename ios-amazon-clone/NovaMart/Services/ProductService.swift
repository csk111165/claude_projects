import Foundation

enum ProductService {
    static func searchProducts(_ query: String, in products: [Product] = mockProducts) -> [Product] {
        guard !query.isEmpty else { return products }
        let lowered = query.lowercased()
        return products.filter { product in
            product.name.lowercased().contains(lowered) ||
            product.description.lowercased().contains(lowered) ||
            product.brand.lowercased().contains(lowered) ||
            product.category.lowercased().contains(lowered) ||
            product.tags.contains(where: { $0.lowercased().contains(lowered) })
        }
    }

    static func filterByCategory(_ category: String, in products: [Product] = mockProducts) -> [Product] {
        products.filter { $0.category == category }
    }

    static func filterBySubcategory(_ subcategory: String, in products: [Product] = mockProducts) -> [Product] {
        products.filter { $0.subcategory == subcategory }
    }

    static func filterByPriceRange(min: Double, max: Double, in products: [Product] = mockProducts) -> [Product] {
        products.filter { $0.price >= min && $0.price <= max }
    }

    static func filterByRating(minRating: Double, in products: [Product] = mockProducts) -> [Product] {
        products.filter { $0.rating >= minRating }
    }

    static func filterByInStock(in products: [Product] = mockProducts) -> [Product] {
        products.filter { $0.inStock }
    }

    static func sortProducts(_ products: [Product], by sortOption: String) -> [Product] {
        switch sortOption {
        case "price-asc":
            return products.sorted { $0.price < $1.price }
        case "price-desc":
            return products.sorted { $0.price > $1.price }
        case "rating":
            return products.sorted { $0.rating > $1.rating }
        case "newest":
            return products.sorted { $0.id > $1.id }
        default: // "featured"
            return products
        }
    }

    static func getProduct(byId id: String) -> Product? {
        mockProducts.first { $0.id == id }
    }

    static func getProduct(bySlug slug: String) -> Product? {
        mockProducts.first { $0.slug == slug }
    }

    static func getRelatedProducts(for product: Product, limit: Int = 8) -> [Product] {
        let sameCategorySameSubcategory = mockProducts.filter { $0.category == product.category && $0.subcategory == product.subcategory && $0.id != product.id }
        let sameCategory = mockProducts.filter { $0.category == product.category && $0.id != product.id && !sameCategorySameSubcategory.contains($0) }
        let combined = sameCategorySameSubcategory + sameCategory
        return Array(combined.prefix(limit))
    }

    static func getTrendingProducts(limit: Int = 8) -> [Product] {
        let sorted = mockProducts.sorted { $0.reviewCount > $1.reviewCount }
        return Array(sorted.prefix(limit))
    }

    static func getBestSellers(limit: Int = 8) -> [Product] {
        let sorted = mockProducts
            .filter { $0.inStock }
            .sorted { ($0.rating * Double($0.reviewCount)) > ($1.rating * Double($1.reviewCount)) }
        return Array(sorted.prefix(limit))
    }

    static func getTopRated(limit: Int = 8) -> [Product] {
        let sorted = mockProducts
            .filter { $0.inStock }
            .sorted { $0.rating > $1.rating }
        return Array(sorted.prefix(limit))
    }
}
