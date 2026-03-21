"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Role extraction from URL if any
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    if (roleParam === "clinician") {
      setEmail("dr.sarah@nexacare.ai");
    } else if (roleParam === "admin") {
      setEmail("admin@nexacare.ai");
    }
  }, []);

  const handleLogin = (e?: React.FormEvent, role?: string, name?: string) => {
    if (e) e.preventDefault();
    
    // Simulate API auth according to specs
    const authData = {
      role: role || (email.includes("admin") ? "admin" : "clinician"),
      name: name || (email.includes("admin") ? "System Admin" : "Dr. Sarah Chen"),
      token: "demo-token-12345"
    };
    
    localStorage.setItem("nexacare_auth", JSON.stringify(authData));
    document.cookie = `nexacare_token=${authData.token}; path=/; max-age=86400;`;
    document.cookie = `nexacare_role=${authData.role}; path=/; max-age=86400;`;
    router.push("/dashboard");
  };

  const handleDemoLogin = (role: string, name: string) => {
    // Fill out form and submit
    setEmail(role === "admin" ? "admin@nexacare.ai" : "dr.sarah@nexacare.ai");
    setPassword("demo123");
    
    // Simulate a brief delay so user sees the form filled before redirecting
    setTimeout(() => {
        handleLogin(undefined, role, name);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F2F0EB] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="font-display text-4xl font-[800] text-[#1A1A1A] tracking-tight">
            Nexa<span className="text-[#C8A96E] italic">Care</span>.ai
          </Link>
        </div>
        <h2 className="text-center text-2xl font-semibold tracking-tight text-[#1A1A1A]">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-[#E0DDD7]">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#1A1A1A]">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-[#1A1A1A] shadow-sm ring-1 ring-inset ring-[#E0DDD7] placeholder:text-[#9B9B9B] focus:ring-2 focus:ring-inset focus:ring-[#1A1A1A] sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#1A1A1A]">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-[#1A1A1A] shadow-sm ring-1 ring-inset ring-[#E0DDD7] placeholder:text-[#9B9B9B] focus:ring-2 focus:ring-inset focus:ring-[#1A1A1A] sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#1A1A1A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A] transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E0DDD7]" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-[#6B6B6B]">Or continue with demo</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <button
                type="button"
                onClick={() => handleDemoLogin("clinician", "Dr. Sarah Chen")}
                className="flex w-full justify-center rounded-md border border-[#E0DDD7] bg-[#F2F0EB] px-3 py-2 text-sm font-semibold text-[#1A1A1A] shadow-sm hover:bg-[#E0DDD7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
              >
                Demo: Clinician Login
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("admin", "System Admin")}
                className="flex w-full justify-center rounded-md border border-[#1A1A1A] bg-transparent px-3 py-2 text-sm font-semibold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                Demo: Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
