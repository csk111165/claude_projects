import XCTest

final class OrderCancellationTests: XCTestCase {
    let app = XCUIApplication()

    override func setUp() {
        continueAfterFailure = false
        app.launch()
    }

    func testAccountTabShowsSignIn() {
        app.tabBars.buttons["Account"].tap()
        let signInText = app.staticTexts["Sign In to NovaMart"]
        XCTAssertTrue(signInText.waitForExistence(timeout: 5))
    }
}
