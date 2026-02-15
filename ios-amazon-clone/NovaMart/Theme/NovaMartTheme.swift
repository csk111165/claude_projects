import SwiftUI

extension Color {
    static let novamartOrange = Color(hex: "FF9900")
    static let novamartOrangeHover = Color(hex: "FFa31a")
    static let novamartNavyDark = Color(hex: "131921")
    static let novamartNavyLight = Color(hex: "232F3E")
    static let novamartBlue = Color(hex: "146EB4")
}

extension ShapeStyle where Self == Color {
    static var novamartOrange: Color { Color.novamartOrange }
    static var novamartOrangeHover: Color { Color.novamartOrangeHover }
    static var novamartNavyDark: Color { Color.novamartNavyDark }
    static var novamartNavyLight: Color { Color.novamartNavyLight }
    static var novamartBlue: Color { Color.novamartBlue }

    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet(charactersIn: "#"))
        let scanner = Scanner(string: hex)
        var rgbValue: UInt64 = 0
        scanner.scanHexInt64(&rgbValue)

        let r = Double((rgbValue & 0xFF0000) >> 16) / 255.0
        let g = Double((rgbValue & 0x00FF00) >> 8) / 255.0
        let b = Double(rgbValue & 0x0000FF) / 255.0

        self.init(red: r, green: g, blue: b)
    }
}

extension Font {
    static let novamartTitle = Font.system(size: 28, weight: .bold)
    static let novamartHeadline = Font.system(size: 20, weight: .semibold)
    static let novamartSubheadline = Font.system(size: 16, weight: .medium)
    static let novamartBody = Font.system(size: 14, weight: .regular)
    static let novamartCaption = Font.system(size: 12, weight: .regular)
    static let novamartPrice = Font.system(size: 18, weight: .bold)
}
