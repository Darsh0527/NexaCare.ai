"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

export default function AlertsPage() {
  const [filter, setFilter] = useState("ALL");
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get('/alerts');
        setAlerts(res.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch alerts');
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const filteredAlerts = alerts.filter(a => filter === "ALL" || a.severity === filter);

  const resolveAlert = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-full min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A1A1A]"></div>
    </div>
  );
  if (error) return <div className="p-8 text-red-500 font-medium">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-display font-bold text-[#1A1A1A]">Active Alerts</h1>
        
        <div className="flex gap-2 bg-[#F2F0EB] p-1 rounded-lg border border-[#E0DDD7]">
          {["ALL", "CRITICAL", "HIGH", "MEDIUM"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors flex-1 sm:flex-none text-center ${
                filter === f 
                  ? "bg-white text-[#1A1A1A] shadow-sm border border-[#E0DDD7]" 
                  : "text-[#6B6B6B] hover:text-[#1A1A1A] border border-transparent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-20 text-[#6B6B6B] bg-white rounded-xl border border-[#E0DDD7]">
            <CheckCircle className="mx-auto text-green-500 mb-3 opacity-50" size={48} />
            <p className="text-lg font-medium text-[#1A1A1A]">All Clear</p>
            <p className="text-sm">No active alerts for this filter criteria.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            let badgeBg = "bg-yellow-100 text-yellow-800";
            let borderBorder = "border-yellow-200";
            let iconColor = "text-yellow-600";
            
            if (alert.severity === "CRITICAL") {
              badgeBg = "bg-red-100 text-red-800";
              borderBorder = "border-red-200";
              iconColor = "text-red-600";
            } else if (alert.severity === "HIGH") {
              badgeBg = "bg-orange-100 text-orange-800";
              borderBorder = "border-orange-200";
              iconColor = "text-orange-600";
            }

            return (
              <div key={alert.id} className={`bg-white rounded-xl border ${borderBorder} p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:bg-[#F9F8F6]`}>
                <div className="flex items-start gap-4">
                  <div className={`mt-1 bg-white rounded-full p-2 border ${borderBorder}`}>
                    <AlertTriangle className={iconColor} size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${badgeBg}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-[#9B9B9B]">{alert.timeAgo}</span>
                    </div>
                    
                    <div className="text-[#1A1A1A] font-medium text-lg leading-tight mb-1">
                      {alert.reason}
                    </div>
                    
                    <div className="text-sm text-[#6B6B6B] flex items-center gap-2">
                      Patient: 
                      <Link href={`/dashboard/patients/${alert.patientId}`} className="font-semibold text-[#1A1A1A] hover:text-[#C8A96E] hover:underline inline-flex items-center gap-1 transition-colors">
                        {alert.patientName} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => resolveAlert(alert.id)}
                  className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#E0DDD7] text-[#1A1A1A] rounded-lg text-sm font-medium hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors"
                >
                  <CheckCircle size={16} /> Mark Resolved
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
