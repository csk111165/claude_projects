import SwiftUI

struct SignInView: View {
    @Environment(AuthStore.self) private var authStore
    @Environment(\.dismiss) private var dismiss
    @State private var email = ""
    @State private var password = ""
    @State private var errorMessage = ""
    var redirectToCheckout = false

    var body: some View {
        VStack(spacing: 24) {
            Spacer()

            Image(systemName: "person.circle.fill")
                .font(.system(size: 80))
                .foregroundStyle(.novamartOrange)

            Text("Sign In to NovaMart")
                .font(.title2.bold())

            VStack(spacing: 16) {
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
                    SecureField("Password", text: $password)
                        .textFieldStyle(.roundedBorder)
                        .textContentType(.password)
                }
            }
            .padding(.horizontal)

            if !errorMessage.isEmpty {
                Text(errorMessage)
                    .font(.caption)
                    .foregroundStyle(.red)
            }

            Button {
                if authStore.signIn(email: email, password: password) {
                    errorMessage = ""
                    dismiss()
                } else {
                    errorMessage = "Please enter a valid email address"
                }
            } label: {
                Text("Sign In")
                    .font(.headline)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.novamartOrange)
                    .foregroundStyle(.white)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
            }
            .padding(.horizontal)

            NavigationLink {
                SignUpView()
            } label: {
                Text("Don't have an account? **Sign Up**")
                    .font(.subheadline)
            }

            Spacer()
        }
        .navigationTitle("Sign In")
        .navigationBarTitleDisplayMode(.inline)
    }
}
