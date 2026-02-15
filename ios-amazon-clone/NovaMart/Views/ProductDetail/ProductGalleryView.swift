import SwiftUI

struct ProductGalleryView: View {
    let images: [String]
    @State private var selectedIndex = 0

    var body: some View {
        VStack(spacing: 8) {
            TabView(selection: $selectedIndex) {
                ForEach(Array(images.enumerated()), id: \.offset) { index, imageUrl in
                    AsyncImage(url: URL(string: imageUrl)) { image in
                        image.resizable().aspectRatio(contentMode: .fit)
                    } placeholder: {
                        Color.gray.opacity(0.1)
                            .overlay(ProgressView())
                    }
                    .tag(index)
                }
            }
            .tabViewStyle(.page(indexDisplayMode: .automatic))
            .frame(height: 300)

            if images.count > 1 {
                HStack(spacing: 8) {
                    ForEach(Array(images.enumerated()), id: \.offset) { index, imageUrl in
                        AsyncImage(url: URL(string: imageUrl)) { image in
                            image.resizable().aspectRatio(contentMode: .fill)
                        } placeholder: {
                            Color.gray.opacity(0.2)
                        }
                        .frame(width: 50, height: 50)
                        .clipShape(RoundedRectangle(cornerRadius: 6))
                        .overlay(
                            RoundedRectangle(cornerRadius: 6)
                                .stroke(selectedIndex == index ? Color.novamartOrange : .clear, lineWidth: 2)
                        )
                        .onTapGesture { selectedIndex = index }
                    }
                }
                .padding(.horizontal)
            }
        }
    }
}
