import SwiftUI

struct CategoryGridView: View {
    let categories = mockCategories
    let columns = [GridItem(.adaptive(minimum: 80), spacing: 12)]

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Shop by Category")
                .font(.headline)
                .padding(.horizontal)

            LazyVGrid(columns: columns, spacing: 12) {
                ForEach(categories) { category in
                    NavigationLink(destination: CategoryView(category: category)) {
                        VStack(spacing: 6) {
                            AsyncImage(url: URL(string: category.image)) { image in
                                image.resizable().aspectRatio(contentMode: .fill)
                            } placeholder: {
                                Color.gray.opacity(0.2)
                            }
                            .frame(width: 60, height: 60)
                            .clipShape(Circle())

                            Text(category.name)
                                .font(.caption2)
                                .lineLimit(1)
                                .foregroundStyle(.primary)
                        }
                    }
                }
            }
            .padding(.horizontal)
        }
    }
}
