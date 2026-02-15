import XCTest

final class CheckoutFlowTests: XCTestCase {
    let app = XCUIApplication()

    override func setUp() {
        continueAfterFailure = false
        app.launch()
    }

    func testCheckoutRequiresAuth() {
        // Add item then go to cart
        app.tabBars.buttons["Browse"].tap()
        let product = app.scrollViews.buttons.firstMatch
        if product.waitForExistence(timeout: 5) {
            product.tap()
        }
        let addButton = app.buttons["Add to Cart"]
        if addButton.waitForExistence(timeout: 5) {
            addButton.tap()
        }

        app.tabBars.buttons["Cart"].tap()

        // Try to checkout
        let checkout = app.buttons["Proceed to Checkout"]
        if checkout.waitForExistence(timeout: 5) {
            checkout.tap()
        }

        // Should show sign in
        let signIn = app.staticTexts["Sign In to NovaMart"]
        XCTAssertTrue(signIn.waitForExistence(timeout: 5))
    }
}
