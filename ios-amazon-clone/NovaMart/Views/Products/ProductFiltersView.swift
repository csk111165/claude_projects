import SwiftUI

struct ProductFiltersView: View {
    @Binding var selectedCategory: String?
    @Binding var selectedPriceRange: Int?
    @Binding var minRating: Double?
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                Section("Category") {
                    Button("All Categories") {
                        selectedCategory = nil
                    }
                    .foregroundStyle(selectedCategory == nil ? .novamartOrange : .primary)

                    ForEach(mockCategories) { category in
                        Button(category.name) {
                            selectedCategory = category.slug
                        }
                        .foregroundStyle(selectedCategory == category.slug ? .novamartOrange : .primary)
                    }
                }

                Section("Price Range") {
                    Button("Any Price") {
                        selectedPriceRange = nil
                    }
                    .foregroundStyle(selectedPriceRange == nil ? .novamartOrange : .primary)

                    ForEach(Array(Constants.priceRanges.enumerated()), id: \.offset) { index, range in
                        Button(range.label) {
                            selectedPriceRange = index
                        }
                        .foregroundStyle(selectedPriceRange == index ? .novamartOrange : .primary)
                    }
                }

                Section("Rating") {
                    Button("Any Rating") {
                        minRating = nil
                    }
                    .foregroundStyle(minRating == nil ? .novamartOrange : .primary)

                    ForEach(Constants.ratingFilters, id: \.self) { rating in
                        Button {
                            minRating = Double(rating)
                        } label: {
                            HStack {
                                RatingStarsView(rating: Double(rating), size: 14)
                                Text("& Up")
                                    .font(.subheadline)
                            }
                        }
                        .foregroundStyle(minRating == Double(rating) ? .novamartOrange : .primary)
                    }
                }

                Section {
                    Button("Clear All Filters") {
                        selectedCategory = nil
                        selectedPriceRange = nil
                        minRating = nil
                    }
                    .foregroundStyle(.red)
                }
            }
            .navigationTitle("Filters")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                }
            }
        }
    }
}
