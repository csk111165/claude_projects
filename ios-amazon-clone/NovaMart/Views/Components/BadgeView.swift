import SwiftUI

struct BadgeView<Content: View>: View {
    let count: Int
    @ViewBuilder let content: Content

    var body: some View {
        ZStack(alignment: .topTrailing) {
            content
            if count > 0 {
                Text("\(count)")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundStyle(.white)
                    .padding(4)
                    .background(Color.novamartOrange)
                    .clipShape(Circle())
                    .offset(x: 8, y: -8)
            }
        }
    }
}
