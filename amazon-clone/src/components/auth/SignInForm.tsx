"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signIn = useAuthStore((s) => s.signIn);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = signIn(email, password);
    if (success) {
      router.push("/account");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="border rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-medium text-gray-900">Sign In</h1>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Your password"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium border border-[#FCD200] shadow-none"
          >
            Sign In
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center">
          By signing in, you agree to NovaMart&apos;s Terms of Use and Privacy Policy.
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          New to NovaMart?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:text-[#FF9900] hover:underline">
            Create your account
          </Link>
        </p>
      </div>
    </div>
  );
}
