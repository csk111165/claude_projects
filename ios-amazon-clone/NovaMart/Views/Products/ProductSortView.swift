import SwiftUI

struct ProductSortView: View {
    @Binding var selectedSort: String
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                ForEach(Constants.sortOptions) { option in
                    Button {
                        selectedSort = option.value
                        dismiss()
                    } label: {
                        HStack {
                            Text(option.label)
                            Spacer()
                            if selectedSort == option.value {
                                Image(systemName: "checkmark")
                                    .foregroundStyle(.novamartOrange)
                            }
                        }
                    }
                    .foregroundStyle(.primary)
                }
            }
            .navigationTitle("Sort By")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                }
            }
        }
    }
}
