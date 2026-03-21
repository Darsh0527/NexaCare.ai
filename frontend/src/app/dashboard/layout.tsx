"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] = useState("clinician");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const authData = localStorage.getItem("nexacare_auth");
    if (authData) {
      const parsed = JSON.parse(authData);
      setUserName(parsed.name || "User");
      setUserRole(parsed.role || "clinician");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("nexacare_auth");
    document.cookie = "nexacare_token=; path=/; max-age=0;";
    document.cookie = "nexacare_role=; path=/; max-age=0;";
    router.push("/login");
  };

  if (!isMounted) return null; // Avoid hydration mismatch for localStorage dependent render

  return (
    <div className="flex h-screen overflow-hidden bg-[#F2F0EB]">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-[#E0DDD7] shrink-0">
          <div className="font-display font-bold text-xl text-[#1A1A1A]">
            Nexa<span className="text-[#C8A96E] italic">Care</span><span className="text-[#9B9B9B] font-sans font-medium text-sm ml-2">.ai</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#1A1A1A]">{userName}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                userRole === "admin" ? "bg-[#1A1A1A] text-white" : "bg-[#C8A96E] text-white"
              }`}>
                {userRole === "admin" ? "ADMIN" : "CLINICIAN"}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors border-l border-[#E0DDD7] pl-6"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
