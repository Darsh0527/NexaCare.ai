"use client";

import { useState } from "react";
import Link from "next/link";
import { patients, alerts, forecastData } from "@/data/mockData";
import { Users, AlertTriangle, Activity, Bed, ArrowRight, Calculator } from "lucide-react";

export default function DashboardOverview() {
  const totalPatients = patients.length;
  const criticalAlerts = alerts.filter(a => a.severity === "CRITICAL" || a.severity === "HIGH").length;
  const avgRiskScore = Math.round(patients.reduce((acc, p) => acc + p.riskScore, 0) / patients.length);
  const bedsNeededToday = forecastData[0]?.beds_needed || 0;

  const topPatients = [...patients].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);
  const recentAlerts = [...alerts].slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-[#1A1A1A]">Platform Overview</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-[#E0DDD7] p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-[#6B6B6B]">Total Patients</h3>
            <Users className="text-[#C8A96E]" size={20} />
          </div>
          <div className="text-3xl font-display font-bold text-[#1A1A1A]">{totalPatients}</div>
        </div>
        
        <div className="bg-white rounded-xl border border-[#E0DDD7] p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-[#6B6B6B]">Critical/High Alerts</h3>
            <AlertTriangle className="text-red-500" size={20} />
          </div>
          <div className="text-3xl font-display font-bold text-[#1A1A1A]">{criticalAlerts}</div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0DDD7] p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-[#6B6B6B]">Avg Risk Score</h3>
            <Activity className="text-orange-500" size={20} />
          </div>
          <div className="text-3xl font-display font-bold text-[#1A1A1A]">{avgRiskScore}</div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0DDD7] p-5 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-[#6B6B6B]">Beds Needed Today</h3>
            <Bed className="text-blue-500" size={20} />
          </div>
          <div className="text-3xl font-display font-bold text-[#1A1A1A]">{bedsNeededToday}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 Highest Risk Patients */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E0DDD7] shadow-sm flex flex-col h-[400px]">
          <div className="p-5 border-b border-[#E0DDD7] flex justify-between items-center">
            <h2 className="font-semibold text-[#1A1A1A]">Top At-Risk Patients</h2>
            <Link href="/dashboard/patients" className="text-sm text-[#C8A96E] hover:underline flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {topPatients.map(patient => (
              <Link key={patient.id} href={`/dashboard/patients/${patient.id}`} className="flex items-center justify-between p-3 hover:bg-[#F2F0EB] rounded-lg transition-colors group">
                <div>
                  <div className="font-medium text-[#1A1A1A] group-hover:text-[#C8A96E] transition-colors">{patient.name}</div>
                  <div className="text-xs text-[#6B6B6B]">{patient.diagnosis}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-2 py-1 rounded text-xs font-bold ${
                    patient.riskLevel === "CRITICAL" ? "bg-red-100 text-red-700" :
                    patient.riskLevel === "HIGH" ? "bg-orange-100 text-orange-700" :
                    patient.riskLevel === "MEDIUM" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {patient.riskScore} {patient.riskLevel}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 h-[400px]">
          {/* Quick Risk Calculator Widget */}
          <div className="bg-[#1A1A1A] rounded-xl border border-[#333333] shadow-sm p-6 text-white text-center flex flex-col justify-center items-center shrink-0">
            <Calculator size={32} className="text-[#C8A96E] mb-3" />
            <h3 className="font-semibold mb-2">Manual Risk Assessment</h3>
            <p className="text-xs text-[#9B9B9B] mb-4">Calculate risk score on the fly using ML predictions.</p>
            <Link href="/dashboard/patients" className="bg-[#C8A96E] text-[#1A1A1A] px-4 py-2 rounded-lg text-sm font-medium w-full transition-colors hover:bg-white text-center">
              Open Calculator
            </Link>
          </div>

          {/* Recent Alerts Mini List */}
          <div className="bg-white rounded-xl border border-[#E0DDD7] shadow-sm flex flex-col flex-1 overflow-hidden">
            <div className="p-4 border-b border-[#E0DDD7] flex justify-between items-center bg-[#F9F8F6]">
              <h2 className="font-semibold text-sm text-[#1A1A1A]">Recent Alerts</h2>
            </div>
            <div className="flex-1 overflow-auto p-2">
              {recentAlerts.slice(0, 3).map(alert => (
                <div key={alert.id} className="p-3 border-b border-[#E0DDD7] last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      alert.severity === "CRITICAL" ? "bg-red-500 text-white" :
                      alert.severity === "HIGH" ? "bg-orange-500 text-white" : "bg-yellow-500 text-white"
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-[10px] text-[#9B9B9B]">{alert.timeAgo}</span>
                  </div>
                  <div className="text-xs font-semibold text-[#1A1A1A]">{alert.patientName}</div>
                  <div className="text-[11px] text-[#6B6B6B] line-clamp-1">{alert.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
