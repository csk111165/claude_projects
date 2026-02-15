import XCTest

final class AuthFlowTests: XCTestCase {
    let app = XCUIApplication()

    override func setUp() {
        continueAfterFailure = false
        app.launch()
    }

    func testSignInFlow() {
        app.tabBars.buttons["Account"].tap()

        let emailField = app.textFields["you@example.com"]
        if emailField.waitForExistence(timeout: 5) {
            emailField.tap()
            emailField.typeText("test@example.com")
        }

        let passwordField = app.secureTextFields["Password"]
        if passwordField.waitForExistence(timeout: 5) {
            passwordField.tap()
            passwordField.typeText("password123")
        }

        let signInButton = app.buttons["Sign In"]
        if signInButton.waitForExistence(timeout: 5) {
            signInButton.tap()
        }

        // Should navigate to account view
        let accountTitle = app.navigationBars["My Account"]
        XCTAssertTrue(accountTitle.waitForExistence(timeout: 5))
    }
}
