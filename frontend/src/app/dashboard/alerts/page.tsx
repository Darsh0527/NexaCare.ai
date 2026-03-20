"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ClinicianDashboard from "@/components/ClinicianDashboard";
import { activeAlerts, mockPatients } from "@/data/mockData";

function severityBadgeClass(severity: (typeof activeAlerts)[number]["severity"]) {
  if (severity === "CRITICAL") return "bg-red-100 text-red-700";
  if (severity === "HIGH") return "bg-orange-100 text-orange-700";
  if (severity === "MODERATE") return "bg-green-100 text-green-700";
  return "bg-gray-100 text-gray-700";
}

export default function AlertsPage() {
  const router = useRouter();

  const alertsList = (
    <section className="bg-white p-6 rounded-[20px] border border-[#E0DDD7] shadow-sm">
      <h2 className="text-xl font-bold mb-4">Active Alerts</h2>
      <ul className="space-y-3">
        {activeAlerts.map((a) => {
          const patient = mockPatients.find((p) => p.id === a.patientId);
          return (
            <li key={a.id} className="flex items-start justify-between gap-4 border-b border-[#E0DDD7] pb-3 last:border-b-0">
              <div>
                <div className="font-semibold">{a.title}</div>
                <div className="text-sm text-[#6B6B6B] mt-1">
                  Patient: {patient?.name ?? a.patientId} • {a.message}
                </div>
                <div className="text-xs text-[#9B9B9B] mt-2">
                  Started: {new Date(a.startedAt).toLocaleString()}
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${severityBadgeClass(a.severity)}`}>{a.severity}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );

  return (
    <ClinicianDashboard
      showRiskCalculator={false}
      onSelectPatient={(patientId) => router.push(`/dashboard/patients/${patientId}`)}
      additionalMainSections={alertsList}
    />
  );
}

