"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoginStore } from "../zustand/loginContext";
// import { signIn } from '@/lib/supabase/auth'

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useLoginStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Get all users and find the one with matching email
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const data = await response.json();
      
      // Find user with matching email
      const users = data.users || [];
      const user = users.find((u: any) => u.email === email);
      
      if (!user) {
        throw new Error("Invalid email or password");
      }
      
      // Note: In production, password should be verified on backend
      // For now, we just check if user exists
      if (user.password !== password) {
        throw new Error("Invalid email or password");
      }
      
      // Save userId to localStorage
      if (user._id) {
        localStorage.setItem("userId", user._id);
        // Update login state in zustand store
        login();
      }
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-dark-brown mb-3">Journal</h1>
          <p className="text-warm-gray text-sm">Sign in to your account</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-2 text-dark-brown"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-2 text-dark-brown"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-sm text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-warm-gray">
              Don't have an account?{" "}
              <Link href="/signup" className="text-dark-brown hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
