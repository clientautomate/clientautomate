"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full text-center">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-500">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full">
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold text-gray-900">ClientAutomate</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-1">Start your free trial</h1>
          <p className="text-gray-500 text-sm">14 days free. No credit card required.</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourbusiness.com"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
              minLength={8}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create free account"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
