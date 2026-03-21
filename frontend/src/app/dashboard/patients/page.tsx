"use client";

import { useState } from "react";
import Link from "next/link";
import { patients } from "@/data/mockData";
import { Search, ArrowRight } from "lucide-react";

export default function PatientsListPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Risk Score");

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortBy === "Risk Score") return b.riskScore - a.riskScore;
    if (sortBy === "Name") return a.name.localeCompare(b.name);
    if (sortBy === "Age") return b.age - a.age;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-display font-bold text-[#1A1A1A]">Patient Directory</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9B9B]" size={16} />
            <input
              type="text"
              placeholder="Search name or diagnosis..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 px-4 py-2 w-full sm:w-64 rounded-lg border border-[#E0DDD7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#E0DDD7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
          >
            <option value="Risk Score">Sort by: Risk Score</option>
            <option value="Name">Sort by: Name</option>
            <option value="Age">Sort by: Age</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedPatients.map(patient => {
          let bgColor = "bg-green-50 border-green-200";
          let badgeColor = "bg-green-100 text-green-800";
          
          if (patient.riskScore >= 80) {
            bgColor = "bg-red-50 border-red-200";
            badgeColor = "bg-red-100 text-red-800";
          } else if (patient.riskScore >= 60) {
            bgColor = "bg-orange-50 border-orange-200";
            badgeColor = "bg-orange-100 text-orange-800";
          } else if (patient.riskScore >= 40) {
            bgColor = "bg-yellow-50 border-yellow-200";
            badgeColor = "bg-yellow-100 text-yellow-800";
          }

          return (
            <div key={patient.id} className={`rounded-xl border p-5 shadow-sm transition-transform hover:-translate-y-1 ${bgColor}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-[#1A1A1A]">{patient.name}</h3>
                  <div className="text-sm text-[#6B6B6B]">{patient.age} yrs • {patient.diagnosis}</div>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
                  {patient.riskScore} {patient.riskLevel}
                </div>
              </div>
              
              <div className="mb-6 h-[40px]">
                <div className="text-xs font-semibold text-[#1A1A1A] mb-1">Top Risk Reason</div>
                <div className="text-xs text-[#6B6B6B] line-clamp-2">
                  {patient.riskReasons[0]}
                </div>
              </div>

              <Link
                href={`/dashboard/patients/${patient.id}`}
                className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-[#E0DDD7] rounded-lg text-sm font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors hover:border-[#1A1A1A]"
              >
                View Details <ArrowRight size={16} />
              </Link>
            </div>
          );
        })}
      </div>
      
      {sortedPatients.length === 0 && (
        <div className="text-center py-20 text-[#6B6B6B]">
          No patients found matching your search.
        </div>
      )}
    </div>
  );
}
