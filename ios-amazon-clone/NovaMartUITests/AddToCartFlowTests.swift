import XCTest

final class AddToCartFlowTests: XCTestCase {
    let app = XCUIApplication()

    override func setUp() {
        continueAfterFailure = false
        app.launch()
    }

    func testAddItemToCart() {
        // Navigate to browse tab
        app.tabBars.buttons["Browse"].tap()

        // Tap first product
        let firstProduct = app.scrollViews.buttons.firstMatch
        if firstProduct.waitForExistence(timeout: 5) {
            firstProduct.tap()
        }

        // Tap Add to Cart
        let addButton = app.buttons["Add to Cart"]
        if addButton.waitForExistence(timeout: 5) {
            addButton.tap()
        }

        // Navigate to cart
        app.tabBars.buttons["Cart"].tap()

        // Verify cart is not empty
        XCTAssertFalse(app.staticTexts["Your Cart is Empty"].exists)
    }
}
