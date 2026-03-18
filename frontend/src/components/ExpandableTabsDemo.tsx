"use client"

import { Bell, Home, HelpCircle, Settings, Shield, Mail, User, FileText, Lock } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

function DefaultDemo() {
  const tabs = [
    { title: "Dashboard", icon: Home },
    { title: "Notifications", icon: Bell },
    { type: "separator" } as const,
    { title: "Settings", icon: Settings },
    { title: "Support", icon: HelpCircle },
    { title: "Security", icon: Shield },
  ];

  return (
    <div className="flex justify-center gap-4 w-full">
      <ExpandableTabs tabs={tabs} activeColor="text-[#1A1A1A]" className="border-[#E0DDD7]" />
    </div>
  );
}

function CustomColorDemo() {
  const tabs = [
    { title: "Patient Profile", icon: User },
    { title: "Clinical Notes", icon: FileText },
    { type: "separator" } as const,
    { title: "Messaging", icon: Mail },
    { title: "HIPAA Privacy", icon: Lock },
  ];

  return (
    <div className="flex justify-center gap-4 w-full">
      <ExpandableTabs 
        tabs={tabs} 
        activeColor="text-[#C8A96E]"
        className="border-[#C8A96E]/20" 
      />
    </div>
  );
}

export { DefaultDemo, CustomColorDemo };
