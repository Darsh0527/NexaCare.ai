"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "clinician" | "admin";

function setCookie(name: string, value: string) {
  // Cookie is needed for Next.js middleware (server-side) to protect /dashboard routes.
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24}`;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (role: Role) => {
    setIsSubmitting(true);
    setError(null);

    try {
      localStorage.setItem("role", role);
      setCookie("nexacare_role", role);
      setCookie("nexacare_auth", "1");
      // MVP requirement: always go to dashboard after login.
      router.replace("/dashboard");
    } catch (e) {
      setError("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Demo-only: accept any credentials and default to clinician.
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    await handleLogin("clinician");
  };

  return (
    <main className="min-h-screen bg-[#F2F0EB] flex items-center justify-center p-6">
      <section className="w-full max-w-lg bg-white border border-[#E0DDD7] rounded-[20px] p-8 shadow-sm">
        <h1 className="text-3xl font-bold font-display text-[#1A1A1A] mb-2">NexaCare Login</h1>
        <p className="text-[#6B6B6B] mb-6">Demo login for datathon MVP. No real authentication.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1A1A1A]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#E0DDD7] rounded-[12px] p-3 outline-none focus:border-[#C8A96E]"
              placeholder="you@hospital.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1A1A1A]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#E0DDD7] rounded-[12px] p-3 outline-none focus:border-[#C8A96E]"
              placeholder="••••••••"
            />
          </div>

          {error ? <div className="text-sm text-red-600 font-medium">{error}</div> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1A1A1A] text-white px-5 py-3 rounded-[12px] font-bold hover:bg-gray-800 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 border-t border-[#E0DDD7] pt-6 space-y-3">
          <button
            onClick={() => handleLogin("clinician")}
            disabled={isSubmitting}
            className="w-full bg-white border border-[#1A1A1A] text-[#1A1A1A] px-5 py-3 rounded-[12px] font-bold hover:bg-[#F2F0EB] transition-colors disabled:opacity-60"
          >
            Login as Clinician
          </button>
          <button
            onClick={() => handleLogin("admin")}
            disabled={isSubmitting}
            className="w-full bg-white border border-[#1A1A1A] text-[#1A1A1A] px-5 py-3 rounded-[12px] font-bold hover:bg-[#F2F0EB] transition-colors disabled:opacity-60"
          >
            Login as Admin
          </button>
        </div>

        <p className="text-xs text-[#9B9B9B] mt-6">
          Tip: click the demo buttons. Your role is stored in <code>localStorage</code> and a cookie for route protection.
        </p>
      </section>
    </main>
  );
}

