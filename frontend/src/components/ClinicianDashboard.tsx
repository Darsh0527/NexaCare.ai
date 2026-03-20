"use client";

import React, { useMemo, useState } from "react";
import RiskChart from "@/components/RiskChart";
import { mockPatients, type Patient } from "@/data/mockData";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  selectedPatientId?: string; // controlled selection for the detail page
  onSelectPatient?: (patientId: string) => void; // navigation hook for the patient queue
  showRiskCalculator?: boolean;
  additionalMainSections?: React.ReactNode;
};

function riskBadgeClass(score: number) {
  if (score >= 80) return "bg-red-100 text-red-700";
  if (score >= 60) return "bg-orange-100 text-orange-700";
  return "bg-green-100 text-green-700";
}

function buildTrajectory(riskScore: number) {
  // Simple deterministic trajectory to keep the existing chart visual.
  const base = riskScore / 100;
  const steps = [0.35, 0.42, 0.55, 0.62, 0.75, 0.9];
  return steps.map((s) => Math.round(100 * (base * 0.55 + s * 0.45)));
}

export default function ClinicianDashboard({
  selectedPatientId,
  onSelectPatient,
  showRiskCalculator = false,
  additionalMainSections,
}: Props) {
  const router = useRouter();

  const [patients, setPatients] = useState<Patient[]>(() => [...mockPatients]);

  const sortedPatients = useMemo(() => {
    return [...patients].sort((a, b) => b.riskScore - a.riskScore);
  }, [patients]);

  const [internalSelectedPatientId, setInternalSelectedPatientId] = useState<string>(
    () => selectedPatientId ?? sortedPatients[0]?.id ?? mockPatients[0].id
  );

  const effectiveSelectedPatientId = selectedPatientId ?? internalSelectedPatientId;

  const selectedPatient = useMemo(() => {
    return (
      patients.find((p) => p.id === effectiveSelectedPatientId) ??
      sortedPatients.find((p) => p.id === effectiveSelectedPatientId) ??
      sortedPatients[0]
    );
  }, [patients, effectiveSelectedPatientId, sortedPatients]);

  const [isCalculating, setIsCalculating] = useState(false);
  const [calcError, setCalcError] = useState<string | null>(null);

  // Mock time-series data for the chart (still derived from real riskScore)
  const chartLabels = ["12:00", "16:00", "20:00", "00:00", "04:00", "08:00"];
  const chartData = selectedPatient ? buildTrajectory(selectedPatient.riskScore) : [0, 0, 0, 0, 0, 0];

  const ML_API_BASE_URL = process.env.NEXT_PUBLIC_ML_API_URL ?? "http://localhost:8000";

  async function handleCalculateRisk() {
    if (!selectedPatient) return;
    setIsCalculating(true);
    setCalcError(null);

    try {
      const res = await fetch(`${ML_API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: selectedPatient.age,
          heart_rate: selectedPatient.vitals.heart_rate,
          blood_pressure: selectedPatient.vitals.blood_pressure,
          temperature: selectedPatient.vitals.temperature,
          oxygen_level: selectedPatient.vitals.oxygen_level,
        }),
      });

      if (!res.ok) {
        throw new Error(`Predict failed: ${res.status} ${res.statusText}`);
      }

      const data: { risk_score: number; risk_reasons: string[] } = await res.json();

      setPatients((prev) =>
        prev.map((p) =>
          p.id === selectedPatient.id
            ? {
                ...p,
                riskScore: data.risk_score,
                riskReasons:
                  Array.isArray(data.risk_reasons) && data.risk_reasons.length > 0 ? data.risk_reasons : p.riskReasons,
              }
            : p
        )
      );
    } catch (err) {
      setCalcError(err instanceof Error ? err.message : "Failed to calculate risk");
    } finally {
      setIsCalculating(false);
    }
  }

  function handlePatientQueueClick(patientId: string) {
    if (!selectedPatientId) {
      setInternalSelectedPatientId(patientId);
    }
    onSelectPatient?.(patientId);
  }

  function handleLogout() {
    localStorage.clear();
    document.cookie = "nexacare_auth=; path=/; max-age=0";
    document.cookie = "nexacare_role=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-[#F2F0EB] text-[#1A1A1A] font-sans flex">
      {/* Sidebar - Patient Queue */}
      <aside className="w-80 bg-white border-r border-[#E0DDD7] h-screen p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 font-display">Patient Queue</h2>

        <nav className="mb-6 space-y-2">
          <Link href="/dashboard/patients" className="block text-sm font-bold text-[#1A1A1A] hover:text-[#C8A96E]">
            Patients
          </Link>
          <Link href="/dashboard/alerts" className="block text-sm font-bold text-[#1A1A1A] hover:text-[#C8A96E]">
            Alerts
          </Link>
          <Link href="/dashboard/forecast" className="block text-sm font-bold text-[#1A1A1A] hover:text-[#C8A96E]">
            Ops Forecast
          </Link>
          <Link href="/dashboard/chat" className="block text-sm font-bold text-[#1A1A1A] hover:text-[#C8A96E]">
            AI Co-pilot
          </Link>
        </nav>

        <div className="space-y-4">
          {sortedPatients.map((p) => (
            <div
              key={p.id}
              onClick={() => handlePatientQueueClick(p.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedPatient?.id === p.id ? "border-[#1A1A1A] shadow-sm" : "border-[#E0DDD7] hover:border-gray-400"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{p.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${riskBadgeClass(p.riskScore)}`}>Risk {p.riskScore}/100</span>
              </div>
              <div className="text-sm text-[#6B6B6B]">Age: {p.age}</div>
              <div className="mt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#9B9B9B]">SHAP Reasons</div>
                <ul className="mt-2 space-y-1">
                  {p.riskReasons.slice(0, 3).map((r, idx) => (
                    <li key={`${p.id}-r-${idx}`} className="text-xs text-[#6B6B6B] leading-snug">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full text-left p-4 rounded-xl bg-[#F2F0EB] hover:bg-[#E8E5DF] transition-colors font-medium"
        >
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold font-display">{selectedPatient?.name ?? "Patient"}</h1>
            <p className="text-[#6B6B6B] mt-1">
              Age: {selectedPatient?.age} | Diagnosis: {selectedPatient?.diagnosis} | Ward: {selectedPatient?.ward} | Time to
              Deterioration: {selectedPatient?.timeToDeterioration}
            </p>
          </div>

          <div className="text-right">
            <div className="text-6xl font-black font-display text-[#1A1A1A]">{selectedPatient?.riskScore ?? 0}</div>
            <div className="text-sm font-bold uppercase tracking-widest text-[#9B9B9B]">Current Risk Score</div>
          </div>
        </header>

        {/* Chart Section */}
        <section className="bg-white p-6 rounded-[20px] border border-[#E0DDD7] mb-8 shadow-sm">
          <RiskChart dataPoints={chartData} labels={chartLabels} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Insights (SHAP) */}
          <section className="bg-white p-6 rounded-[20px] border border-[#E0DDD7] shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-[#C8A96E] italic">AI</span> Insights (SHAP)
            </h3>
            <ul className="space-y-4">
              {selectedPatient?.riskReasons.map((reason, idx) => (
                <li key={`shap-${idx}`} className="flex flex-col border-b border-[#E0DDD7] pb-3 last:border-0">
                  <div className="flex justify-between">
                    <span className="font-semibold">Reason {idx + 1}</span>
                    <span className="text-[#C8A96E] font-bold">Top factor</span>
                  </div>
                  <span className="text-sm text-[#6B6B6B] mt-1">{reason}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Clinical Actions */}
          <section className="bg-white p-6 rounded-[20px] border border-[#E0DDD7] shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">Recommended Actions</h3>
            <div className="space-y-3">
              {showRiskCalculator ? (
                <>
                  <button
                    className="w-full text-left p-4 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors font-bold mt-0 disabled:opacity-60"
                    onClick={handleCalculateRisk}
                    disabled={isCalculating || !selectedPatient}
                  >
                    {isCalculating ? "Calculating Risk..." : "Calculate Risk"}
                  </button>
                  {calcError ? <div className="text-sm text-red-600">{calcError}</div> : null}
                </>
              ) : null}

              <button className="w-full text-left p-4 rounded-xl bg-[#F2F0EB] hover:bg-[#E8E5DF] transition-colors font-medium">
                → Order Arterial Blood Gas (ABG)
              </button>
              <button className="w-full text-left p-4 rounded-xl bg-[#F2F0EB] hover:bg-[#E8E5DF] transition-colors font-medium">
                → Increase Monitoring Frequency to Q1H
              </button>
              <button className="w-full text-left p-4 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors font-bold mt-4">
                Verify ICU Bed Availability
              </button>
            </div>
          </section>
        </div>

        {additionalMainSections ? <div className="mt-8">{additionalMainSections}</div> : null}
      </main>
    </div>
  );
}

