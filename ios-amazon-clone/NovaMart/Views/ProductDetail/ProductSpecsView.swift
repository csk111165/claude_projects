import SwiftUI

struct ProductSpecsView: View {
    let specs: [String: String]
    let features: [String]

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            if !features.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Key Features")
                        .font(.headline)
                    ForEach(features, id: \.self) { feature in
                        HStack(alignment: .top, spacing: 8) {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundStyle(.green)
                                .font(.caption)
                            Text(feature)
                                .font(.subheadline)
                        }
                    }
                }
            }

            if !specs.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Specifications")
                        .font(.headline)
                        .padding(.top, 4)

                    ForEach(Array(specs.sorted(by: { $0.key < $1.key })), id: \.key) { key, value in
                        HStack {
                            Text(key)
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                                .frame(width: 120, alignment: .leading)
                            Text(value)
                                .font(.subheadline)
                            Spacer()
                        }
                        Divider()
                    }
                }
            }
        }
        .padding(.horizontal)
    }
}
