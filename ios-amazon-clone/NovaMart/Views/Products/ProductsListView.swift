import SwiftUI

struct ProductsListView: View {
    @State private var searchText = ""
    @State private var selectedSort = "featured"
    @State private var selectedCategory: String?
    @State private var selectedPriceRange: Int?
    @State private var minRating: Double?
    @State private var showFilters = false
    @State private var isGridView = true

    private var filteredProducts: [Product] {
        var products = mockProducts

        if !searchText.isEmpty {
            products = ProductService.searchProducts(searchText, in: products)
        }
        if let category = selectedCategory {
            products = ProductService.filterByCategory(category, in: products)
        }
        if let rangeIndex = selectedPriceRange, rangeIndex < Constants.priceRanges.count {
            let range = Constants.priceRanges[rangeIndex]
            products = ProductService.filterByPriceRange(min: range.min, max: range.max, in: products)
        }
        if let rating = minRating {
            products = ProductService.filterByRating(minRating: rating, in: products)
        }
        products = ProductService.sortProducts(products, by: selectedSort)
        return products
    }

    var body: some View {
        VStack(spacing: 0) {
            SearchBarView(text: $searchText)
                .padding(.horizontal)
                .padding(.vertical, 8)

            HStack {
                Button { showFilters = true } label: {
                    Label("Filters", systemImage: "line.3.horizontal.decrease")
                        .font(.subheadline)
                }

                Spacer()

                Menu {
                    ForEach(Constants.sortOptions) { option in
                        Button {
                            selectedSort = option.value
                        } label: {
                            HStack {
                                Text(option.label)
                                if selectedSort == option.value {
                                    Image(systemName: "checkmark")
                                }
                            }
                        }
                    }
                } label: {
                    Label("Sort", systemImage: "arrow.up.arrow.down")
                        .font(.subheadline)
                }

                Button {
                    isGridView.toggle()
                } label: {
                    Image(systemName: isGridView ? "list.bullet" : "square.grid.2x2")
                }
            }
            .padding(.horizontal)
            .padding(.bottom, 8)

            Text("\(filteredProducts.count) results")
                .font(.caption)
                .foregroundStyle(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal)

            if isGridView {
                ProductGridView(products: filteredProducts)
            } else {
                List(filteredProducts) { product in
                    NavigationLink(destination: ProductDetailView(product: product)) {
                        ProductRowView(product: product)
                    }
                }
                .listStyle(.plain)
            }
        }
        .navigationTitle("Browse")
        .sheet(isPresented: $showFilters) {
            ProductFiltersView(
                selectedCategory: $selectedCategory,
                selectedPriceRange: $selectedPriceRange,
                minRating: $minRating
            )
        }
    }
}

private struct ProductRowView: View {
    let product: Product

    var body: some View {
        HStack(spacing: 12) {
            AsyncImage(url: URL(string: product.images.first ?? "")) { image in
                image.resizable().aspectRatio(contentMode: .fill)
            } placeholder: {
                Color.gray.opacity(0.2)
            }
            .frame(width: 80, height: 80)
            .clipShape(RoundedRectangle(cornerRadius: 8))

            VStack(alignment: .leading, spacing: 4) {
                Text(product.name)
                    .font(.subheadline)
                    .lineLimit(2)
                RatingStarsView(rating: product.rating, size: 12)
                PriceDisplayView(price: product.price, originalPrice: product.originalPrice, discount: product.discount)
            }
        }
    }
}
