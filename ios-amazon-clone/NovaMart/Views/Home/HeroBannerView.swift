import SwiftUI

struct HeroBannerView: View {
    @State private var currentPage = 0
    let banners = mockBanners

    let timer = Timer.publish(every: 4, on: .main, in: .common).autoconnect()

    var body: some View {
        TabView(selection: $currentPage) {
            ForEach(Array(banners.enumerated()), id: \.element.id) { index, banner in
                ZStack {
                    AsyncImage(url: URL(string: banner.image)) { image in
                        image.resizable().aspectRatio(contentMode: .fill)
                    } placeholder: {
                        Color(hex: banner.bgColor)
                    }

                    VStack(alignment: .leading, spacing: 8) {
                        Text(banner.title)
                            .font(.title2.bold())
                            .foregroundStyle(.white)
                        Text(banner.subtitle)
                            .font(.subheadline)
                            .foregroundStyle(.white.opacity(0.9))
                        Text(banner.ctaText)
                            .font(.subheadline.bold())
                            .padding(.horizontal, 16)
                            .padding(.vertical, 8)
                            .background(Color.novamartOrange)
                            .foregroundStyle(.white)
                            .clipShape(RoundedRectangle(cornerRadius: 6))
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(20)
                    .background(
                        LinearGradient(colors: [.black.opacity(0.7), .clear], startPoint: .bottom, endPoint: .top)
                    )
                    .frame(maxHeight: .infinity, alignment: .bottom)
                }
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .tag(index)
            }
        }
        .tabViewStyle(.page(indexDisplayMode: .always))
        .frame(height: 200)
        .padding(.horizontal)
        .onReceive(timer) { _ in
            withAnimation {
                currentPage = (currentPage + 1) % banners.count
            }
        }
    }
}
