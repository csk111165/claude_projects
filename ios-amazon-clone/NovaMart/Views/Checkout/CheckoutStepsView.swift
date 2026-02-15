import SwiftUI

struct CheckoutStepsView: View {
    let currentStep: Int
    private let steps = ["Shipping", "Payment", "Review"]

    var body: some View {
        HStack(spacing: 0) {
            ForEach(Array(steps.enumerated()), id: \.offset) { index, step in
                HStack(spacing: 4) {
                    ZStack {
                        Circle()
                            .fill(index <= currentStep ? Color.novamartOrange : Color(.systemGray4))
                            .frame(width: 28, height: 28)
                        if index < currentStep {
                            Image(systemName: "checkmark")
                                .font(.caption.bold())
                                .foregroundStyle(.white)
                        } else {
                            Text("\(index + 1)")
                                .font(.caption.bold())
                                .foregroundStyle(index <= currentStep ? .white : .secondary)
                        }
                    }
                    Text(step)
                        .font(.caption)
                        .foregroundStyle(index <= currentStep ? .primary : .secondary)
                }

                if index < steps.count - 1 {
                    Rectangle()
                        .fill(index < currentStep ? Color.novamartOrange : Color(.systemGray4))
                        .frame(height: 2)
                        .frame(maxWidth: .infinity)
                }
            }
        }
    }
}
