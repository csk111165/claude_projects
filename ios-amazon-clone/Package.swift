// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "NovaMart",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(name: "NovaMart", targets: ["NovaMart"]),
    ],
    targets: [
        .target(
            name: "NovaMart",
            path: "NovaMart"
        ),
        .testTarget(
            name: "NovaMartTests",
            dependencies: ["NovaMart"],
            path: "NovaMartTests"
        ),
    ]
)
