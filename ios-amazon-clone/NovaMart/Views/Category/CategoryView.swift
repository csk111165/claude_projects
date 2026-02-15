import SwiftUI

struct CategoryView: View {
    let category: Category
    @State private var selectedSubcategory: String?
    @State private var selectedSort = "featured"

    private var products: [Product] {
        var result = ProductService.filterByCategory(category.slug)
        if let sub = selectedSubcategory {
            result = ProductService.filterBySubcategory(sub, in: result)
        }
        return ProductService.sortProducts(result, by: selectedSort)
    }

    var body: some View {
        VStack(spacing: 0) {
            // Subcategory pills
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    subcategoryPill(name: "All", slug: nil)
                    ForEach(category.subcategories) { sub in
                        subcategoryPill(name: sub.name, slug: sub.slug)
                    }
                }
                .padding(.horizontal)
                .padding(.vertical, 10)
            }

            HStack {
                Text("\(products.count) products")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Spacer()
                Menu {
                    ForEach(Constants.sortOptions) { option in
                        Button(option.label) { selectedSort = option.value }
                    }
                } label: {
                    Label("Sort", systemImage: "arrow.up.arrow.down")
                        .font(.caption)
                }
            }
            .padding(.horizontal)
            .padding(.bottom, 8)

            ProductGridView(products: products)
        }
        .navigationTitle(category.name)
    }

    private func subcategoryPill(name: String, slug: String?) -> some View {
        Button {
            selectedSubcategory = slug
        } label: {
            Text(name)
                .font(.subheadline)
                .padding(.horizontal, 14)
                .padding(.vertical, 7)
                .background(selectedSubcategory == slug ? Color.novamartOrange : Color(.systemGray5))
                .foregroundStyle(selectedSubcategory == slug ? .white : .primary)
                .clipShape(Capsule())
        }
    }
}
