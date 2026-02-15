import SwiftUI

struct DealCountdownView: View {
    let deal: Deal

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Lightning Deal")
                .font(.caption.bold())
                .foregroundStyle(.white)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(.red)
                .clipShape(RoundedRectangle(cornerRadius: 4))

            CountdownTimerView(targetDate: deal.endDate)
        }
    }
}
