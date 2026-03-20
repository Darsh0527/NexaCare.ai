"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ClinicianDashboard from "@/components/ClinicianDashboard";
import { mockPatients, opsForecast } from "@/data/mockData";

function pctColorClass(pct: number) {
  // Simple coloring to communicate utilization.
  if (pct >= 75) return "bg-red-100 text-red-700";
  if (pct >= 68) return "bg-orange-100 text-orange-700";
  return "bg-green-100 text-green-700";
}

export default function ForecastPage() {
  const router = useRouter();

  const forecastList = (
    <section className="bg-white p-6 rounded-[20px] border border-[#E0DDD7] shadow-sm">
      <h2 className="text-xl font-bold mb-4">Ops Forecast (Next 7 days)</h2>
      <div className="space-y-3">
        {opsForecast.map((d) => (
          <div key={d.dateISO} className="flex items-center justify-between gap-4 border-b border-[#E0DDD7] pb-3 last:border-b-0">
            <div className="min-w-[130px]">
              <div className="font-semibold">{d.dayLabel}</div>
              <div className="text-xs text-[#9B9B9B]">{d.dateISO}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-[#6B6B6B]">Admissions: {d.predictedAdmissions}</div>
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${pctColorClass(d.expectedBedsUtilizationPct)}`}>
                Util: {d.expectedBedsUtilizationPct}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-[#6B6B6B]">
        Suggested staffing: <span className="font-semibold text-[#1A1A1A]">{opsForecast[0]?.staffingRecommended}</span>
      </div>
    </section>
  );

  return (
    <ClinicianDashboard
      showRiskCalculator={false}
      onSelectPatient={(patientId) => router.push(`/dashboard/patients/${patientId}`)}
      additionalMainSections={forecastList}
    />
  );
}

