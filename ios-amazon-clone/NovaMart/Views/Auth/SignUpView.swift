import SwiftUI

struct SignUpView: View {
    @Environment(AuthStore.self) private var authStore
    @Environment(\.dismiss) private var dismiss
    @State private var name = ""
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @State private var errorMessage = ""

    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                Image(systemName: "person.badge.plus")
                    .font(.system(size: 60))
                    .foregroundStyle(.novamartOrange)
                    .padding(.top, 20)

                Text("Create Account")
                    .font(.title2.bold())

                VStack(spacing: 16) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Full Name")
                            .font(.subheadline.bold())
                        TextField("John Doe", text: $name)
                            .textFieldStyle(.roundedBorder)
                            .textContentType(.name)
                    }

                    VStack(alignment: .leading, spacing: 4) {
                        Text("Email")
                            .font(.subheadline.bold())
                        TextField("you@example.com", text: $email)
                            .textFieldStyle(.roundedBorder)
                            .keyboardType(.emailAddress)
                            .textContentType(.emailAddress)
                            .autocapitalization(.none)
                    }

                    VStack(alignment: .leading, spacing: 4) {
                        Text("Password")
                            .font(.subheadline.bold())
                        SecureField("Min 6 characters", text: $password)
                            .textFieldStyle(.roundedBorder)
                            .textContentType(.newPassword)
                    }

                    VStack(alignment: .leading, spacing: 4) {
                        Text("Confirm Password")
                            .font(.subheadline.bold())
                        SecureField("Re-enter password", text: $confirmPassword)
                            .textFieldStyle(.roundedBorder)
                            .textContentType(.newPassword)
                    }
                }
                .padding(.horizontal)

                if !errorMessage.isEmpty {
                    Text(errorMessage)
                        .font(.caption)
                        .foregroundStyle(.red)
                }

                Button {
                    if !Validators.isValidName(name) {
                        errorMessage = "Please enter your name"
                    } else if !Validators.isValidEmail(email) {
                        errorMessage = "Please enter a valid email"
                    } else if !Validators.isValidPassword(password) {
                        errorMessage = "Password must be at least 6 characters"
                    } else if password != confirmPassword {
                        errorMessage = "Passwords don't match"
                    } else if authStore.signUp(name: name, email: email, password: password) {
                        errorMessage = ""
                        dismiss()
                    } else {
                        errorMessage = "Could not create account"
                    }
                } label: {
                    Text("Create Account")
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.novamartOrange)
                        .foregroundStyle(.white)
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                }
                .padding(.horizontal)
            }
        }
        .navigationTitle("Sign Up")
        .navigationBarTitleDisplayMode(.inline)
    }
}
