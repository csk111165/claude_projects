import SwiftUI

struct QuantityStepperView: View {
    @Binding var quantity: Int
    var minValue: Int = 1
    var maxValue: Int = 99

    var body: some View {
        HStack(spacing: 0) {
            Button {
                if quantity > minValue { quantity -= 1 }
            } label: {
                Image(systemName: "minus")
                    .font(.caption)
                    .frame(width: 32, height: 32)
                    .background(Color(.systemGray5))
            }
            .disabled(quantity <= minValue)

            Text("\(quantity)")
                .font(.subheadline.bold())
                .frame(width: 40, height: 32)
                .background(Color(.systemGray6))

            Button {
                if quantity < maxValue { quantity += 1 }
            } label: {
                Image(systemName: "plus")
                    .font(.caption)
                    .frame(width: 32, height: 32)
                    .background(Color(.systemGray5))
            }
            .disabled(quantity >= maxValue)
        }
        .clipShape(RoundedRectangle(cornerRadius: 6))
    }
}
