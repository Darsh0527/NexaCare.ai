"use client";

import React, { useEffect, useState } from "react";
import RiskChart from "@/components/RiskChart";

// Mock data since we are doing a UI structural implementation
const MOCK_PATIENTS = [
  { id: "1", name: "Arthur Pendelton", age: 68, riskScore: 88, alert: "HIGH", timeToDeterioration: "6h" },
  { id: "2", name: "Sarah Jenkins", age: 54, riskScore: 42, alert: "MODERATE", timeToDeterioration: "24h" },
  { id: "3", name: "Michael Chang", age: 71, riskScore: 12, alert: "NORMAL", timeToDeterioration: "N/A" }
];

export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState(MOCK_PATIENTS[0]);
  
  // Mock time-series data for the chart
  const chartLabels = ["12:00", "16:00", "20:00", "00:00", "04:00", "08:00"];
  const chartData = selectedPatient.riskScore > 50 
    ? [40, 45, 55, 60, 75, selectedPatient.riskScore] 
    : [20, 22, 18, 25, 30, selectedPatient.riskScore];

  // Mock SHAP insights
  const shapInsights = [
    { feature: "Respiratory Rate", impact: "+12%", desc: "Elevated above baseline" },
    { feature: "SpO2 (Oxygen)", impact: "-8%", desc: "Trending downward over 4hrs" },
    { feature: "Heart Rate", impact: "+5%", desc: "Slight tachycardia" }
  ];

  return (
    <div className="min-h-screen bg-[#F2F0EB] text-[#1A1A1A] font-sans flex">
      {/* Sidebar - Patient Queue */}
      <aside className="w-80 bg-white border-r border-[#E0DDD7] h-screen p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 font-display">High Risk Queue</h2>
        <div className="space-y-4">
          {MOCK_PATIENTS.map((p) => (
            <div 
              key={p.id}
              onClick={() => setSelectedPatient(p)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedPatient.id === p.id ? 'border-[#1A1A1A] shadow-sm' : 'border-[#E0DDD7] hover:border-gray-400'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{p.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${p.alert === 'HIGH' ? 'bg-red-100 text-red-700' : p.alert === 'MODERATE' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                  {p.alert}
                </span>
              </div>
              <div className="flex justify-between text-sm text-[#6B6B6B]">
                <span>Age: {p.age}</span>
                <span>Risk: <strong className="text-black">{p.riskScore}/100</strong></span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold font-display">{selectedPatient.name}</h1>
            <p className="text-[#6B6B6B] mt-1">Age: {selectedPatient.age} | Ward: ICU East | Time to Deterioration: {selectedPatient.timeToDeterioration}</p>
          </div>
          <div className="text-right">
            <div className="text-6xl font-black font-display text-[#1A1A1A]">{selectedPatient.riskScore}</div>
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
              {shapInsights.map((insight, idx) => (
                <li key={idx} className="flex flex-col border-b border-[#E0DDD7] pb-3 last:border-0">
                  <div className="flex justify-between">
                    <span className="font-semibold">{insight.feature}</span>
                    <span className={insight.impact.startsWith('+') ? 'text-red-500 font-bold' : 'text-green-600 font-bold'}>
                      {insight.impact}
                    </span>
                  </div>
                  <span className="text-sm text-[#6B6B6B] mt-1">{insight.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Clinical Actions */}
          <section className="bg-white p-6 rounded-[20px] border border-[#E0DDD7] shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">Recommended Actions</h3>
            <div className="space-y-3">
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
      </main>
    </div>
  );
}
