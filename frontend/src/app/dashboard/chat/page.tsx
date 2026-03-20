"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ClinicianDashboard from "@/components/ClinicianDashboard";

export default function ChatPage() {
  const router = useRouter();

  const chatMock = (
    <section className="bg-white p-6 rounded-[20px] border border-[#E0DDD7] shadow-sm">
      <h2 className="text-xl font-bold mb-4">AI Co-pilot</h2>
      <div className="text-sm text-[#6B6B6B] mb-4">
        Ask for staffing, triage priorities, and escalation recommendations (MVP: placeholder UI).
      </div>
      <div className="space-y-3">
        <div className="bg-[#F2F0EB] rounded-xl p-4 text-sm text-[#1A1A1A]">Clinician: “What should I watch for over the next 12 hours?”</div>
        <div className="bg-white border border-[#E0DDD7] rounded-xl p-4 text-sm text-[#1A1A1A]">
          NexaCare: “Focus on patients with low SpO2 and rising heart rate; escalate monitoring for high utilization days.”
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <input
          disabled
          className="flex-1 border border-[#E0DDD7] rounded-xl p-3 bg-white text-sm text-[#1A1A1A] opacity-70"
          placeholder="Type your question (coming soon)"
        />
        <button disabled className="px-5 py-3 rounded-xl bg-black text-white font-bold opacity-60">
          Send
        </button>
      </div>
    </section>
  );

  return (
    <ClinicianDashboard
      showRiskCalculator={false}
      onSelectPatient={(patientId) => router.push(`/dashboard/patients/${patientId}`)}
      additionalMainSections={chatMock}
    />
  );
}

