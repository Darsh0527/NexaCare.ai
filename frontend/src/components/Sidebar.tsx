"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Bell, TrendingUp, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState("clinician");

  useEffect(() => {
    const authPath = localStorage.getItem("nexacare_auth");
    if (authPath) {
      const auth = JSON.parse(authPath);
      if (auth.role) setRole(auth.role);
    }
  }, []);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard, roles: ["clinician", "admin"] },
    { name: "Patients", href: "/dashboard/patients", icon: Users, roles: ["clinician", "admin"] },
    { name: "Alerts", href: "/dashboard/alerts", icon: Bell, roles: ["clinician", "admin"] },
    { name: "Forecast", href: "/dashboard/forecast", icon: TrendingUp, roles: ["admin"] },
    { name: "Chat", href: "/dashboard/chat", icon: MessageSquare, roles: ["clinician", "admin"] },
  ];

  return (
    <div className="flex flex-col w-64 h-full bg-[#1A1A1A] text-white border-r border-[#333333] shrink-0">
      <div className="p-6">
        <div className="font-display font-bold text-2xl tracking-tight text-white mb-2">
          Menu
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-2">
        {navItems.filter(item => item.roles.includes(role)).map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const exactActive = item.href === '/dashboard' ? pathname === '/dashboard' : isActive;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                exactActive ? "bg-[#C8A96E] text-[#1A1A1A]" : "text-[#9B9B9B] hover:text-white hover:bg-[#333333]"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
