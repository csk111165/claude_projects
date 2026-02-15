import SwiftUI

struct CountdownTimerView: View {
    let targetDate: Date
    @State private var timeRemaining: (hours: Int, minutes: Int, seconds: Int)?

    let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

    var body: some View {
        Group {
            if let time = timeRemaining {
                HStack(spacing: 4) {
                    timeBlock(value: time.hours, label: "hrs")
                    Text(":")
                        .font(.headline)
                        .foregroundStyle(.red)
                    timeBlock(value: time.minutes, label: "min")
                    Text(":")
                        .font(.headline)
                        .foregroundStyle(.red)
                    timeBlock(value: time.seconds, label: "sec")
                }
            } else {
                Text("Deal Ended")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .onReceive(timer) { _ in
            timeRemaining = Helpers.timeRemaining(until: targetDate)
        }
        .onAppear {
            timeRemaining = Helpers.timeRemaining(until: targetDate)
        }
    }

    private func timeBlock(value: Int, label: String) -> some View {
        VStack(spacing: 2) {
            Text(String(format: "%02d", value))
                .font(.system(.headline, design: .monospaced))
                .foregroundStyle(.red)
            Text(label)
                .font(.system(size: 9))
                .foregroundStyle(.secondary)
        }
    }
}
