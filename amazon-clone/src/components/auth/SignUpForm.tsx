"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const signUp = useAuthStore((s) => s.signUp);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const success = signUp(name, email, password);
    if (success) {
      router.push("/account");
    } else {
      setError("Failed to create account");
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="border rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-medium text-gray-900">Create Account</h1>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Your name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First and last name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Re-enter password
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium border border-[#FCD200] shadow-none"
          >
            Create your NovaMart account
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center">
          By creating an account, you agree to NovaMart&apos;s Terms and Privacy Policy.
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-blue-600 hover:text-[#FF9900] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
