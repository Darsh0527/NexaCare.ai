"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { patients, alerts as allAlerts } from "@/data/mockData";
import { ArrowLeft, Activity, Heart, Thermometer, Wind, AlertTriangle, Calculator, X } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler
);

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const patient = patients.find(p => p.id === id);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calcVitals, setCalcVitals] = useState({
    age: patient?.age || 0,
    heartRate: patient?.vitals.heartRate || 0,
    systolicBp: parseInt(patient?.vitals.bloodPressure.split('/')[0] || '120'),
    temperature: patient?.vitals.temperature || 37.0,
    oxygenLevel: patient?.vitals.oxygenLevel || 98
  });
  const [calcResult, setCalcResult] = useState<any>(null);

  if (!patient) return <div className="p-8">Patient not found</div>;

  const patientAlerts = allAlerts.filter(a => a.patientId === patient.id);

  let badgeColor = "text-green-600 border-green-600";
  let bgCircle = "bg-green-50";
  if (patient.riskScore >= 80) {
    badgeColor = "text-red-600 border-red-600";
    bgCircle = "bg-red-50";
  } else if (patient.riskScore >= 60) {
    badgeColor = "text-orange-600 border-orange-600";
    bgCircle = "bg-orange-50";
  } else if (patient.riskScore >= 40) {
    badgeColor = "text-yellow-600 border-yellow-600";
    bgCircle = "bg-yellow-50";
  }

  const suggestions = {
    CRITICAL: "Immediate physician review required",
    HIGH: "Schedule urgent assessment within 2 hours",
    MEDIUM: "Monitor closely, review in 4 hours",
    LOW: "Routine monitoring, no immediate action"
  };

  // Mock data for Risk History Line Chart
  const historyData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Today'],
    datasets: [
      {
        fill: true,
        label: 'Risk Score Over Time',
        data: [
          Math.max(0, patient.riskScore - 15),
          Math.max(0, patient.riskScore - 12),
          Math.max(0, patient.riskScore - 10),
          Math.max(0, patient.riskScore - 8),
          Math.max(0, patient.riskScore - 5),
          Math.max(0, patient.riskScore - 2),
          patient.riskScore
        ],
        borderColor: '#1A1A1A',
        backgroundColor: 'rgba(26, 26, 26, 0.05)',
        tension: 0.4,
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { min: 0, max: 100 }
    }
  };

  // Mock data for SHAP Horizontal Bar Chart
  const shapData = {
    labels: patient.riskReasons.slice(0, 3) || ['Age', 'Vitals', 'History'],
    datasets: [
      {
        label: 'Impact on Risk Score',
        data: [45, 30, 25].slice(0, patient.riskReasons.length),
        backgroundColor: '#C8A96E',
      }
    ]
  };

  const barOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { max: 100 }
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate ML result for now
    setCalcResult({
      risk_score: 85,
      risk_level: "CRITICAL",
      reasons: ["Simulated ML Reason 1", "Simulated ML Reason 2", "Simulated ML Reason 3"],
      confidence: 96
    });
  };

  return (
    <div className="space-y-6 pb-20">
      <Link href="/dashboard/patients" className="inline-flex items-center text-sm font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Patients
      </Link>

      <div className="bg-white rounded-xl border border-[#E0DDD7] p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#1A1A1A] mb-1">{patient.name}</h1>
          <div className="text-[#6B6B6B] font-medium">{patient.age} years • {patient.gender} • {patient.diagnosis}</div>
        </div>
        
        <div className={`flex items-center gap-4 p-4 rounded-xl border ${badgeColor} ${bgCircle}`}>
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-wider mb-1">Risk Level</div>
            <div className="text-4xl font-display font-bold leading-none">{patient.riskScore}</div>
          </div>
          <div className="w-px h-12 bg-current opacity-20 mx-2"></div>
          <div className="font-bold tracking-widest uppercase">{patient.riskLevel}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E0DDD7] p-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-[#6B6B6B] font-semibold mb-1 uppercase">Heart Rate</div>
            <div className="text-2xl font-bold text-[#1A1A1A]">{patient.vitals.heartRate} <span className="text-sm font-normal text-[#9B9B9B]">bpm</span></div>
          </div>
          <Heart className="text-red-500 opacity-80" size={24} />
        </div>
        <div className="bg-white rounded-xl border border-[#E0DDD7] p-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-[#6B6B6B] font-semibold mb-1 uppercase">Blood Pressure</div>
            <div className="text-2xl font-bold text-[#1A1A1A]">{patient.vitals.bloodPressure}</div>
          </div>
          <Activity className="text-blue-500 opacity-80" size={24} />
        </div>
        <div className="bg-white rounded-xl border border-[#E0DDD7] p-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-[#6B6B6B] font-semibold mb-1 uppercase">Temperature</div>
            <div className="text-2xl font-bold text-[#1A1A1A]">{patient.vitals.temperature} <span className="text-sm font-normal text-[#9B9B9B]">°C</span></div>
          </div>
          <Thermometer className="text-orange-500 opacity-80" size={24} />
        </div>
        <div className="bg-white rounded-xl border border-[#E0DDD7] p-4 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-[#6B6B6B] font-semibold mb-1 uppercase">SpO2</div>
            <div className="text-2xl font-bold text-[#1A1A1A]">{patient.vitals.oxygenLevel} <span className="text-sm font-normal text-[#9B9B9B]">%</span></div>
          </div>
          <Wind className="text-cyan-500 opacity-80" size={24} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#E0DDD7] p-6 shadow-sm">
          <h2 className="font-semibold text-[#1A1A1A] mb-4">Risk Factors (SHAP Explanation)</h2>
          <div className="h-64">
            <Bar data={shapData} options={barOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0DDD7] p-6 shadow-sm">
          <h2 className="font-semibold text-[#1A1A1A] mb-4">7-Day Risk History</h2>
          <div className="h-64">
            <Line data={historyData} options={lineOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#E0DDD7] p-6 shadow-sm">
          <h2 className="font-semibold text-[#1A1A1A] mb-4">Suggested Care Action</h2>
          <div className="bg-[#1A1A1A] text-white p-5 rounded-lg flex items-start gap-4">
            <AlertTriangle className="text-[#C8A96E] shrink-0 mt-1" size={24} />
            <div>
              <div className="font-bold text-lg mb-1">{suggestions[patient.riskLevel]}</div>
              <p className="text-[#9B9B9B] text-sm">Based on current risk level ({patient.riskLevel}) and vitals.</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-white border border-[#1A1A1A] text-[#1A1A1A] rounded-lg font-semibold hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            <Calculator size={18} /> Calculate New Risk
          </button>
        </div>

        <div className="bg-white rounded-xl border border-[#E0DDD7] p-6 shadow-sm max-h-[250px] overflow-auto">
          <h2 className="font-semibold text-[#1A1A1A] mb-4">Active Alerts</h2>
          {patientAlerts.length === 0 ? (
            <div className="text-[#6B6B6B] text-sm">No active alerts for this patient.</div>
          ) : (
            <div className="space-y-3">
              {patientAlerts.map(alert => (
                <div key={alert.id} className="p-3 border border-[#E0DDD7] rounded-lg bg-[#F9F8F6]">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500 text-white">{alert.severity}</span>
                    <span className="text-[10px] text-[#9B9B9B]">{alert.timeAgo}</span>
                  </div>
                  <div className="text-sm font-medium text-[#1A1A1A]">{alert.reason}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Risk Calculator Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl relative">
            <button 
              onClick={() => { setIsModalOpen(false); setCalcResult(null); }}
              className="absolute top-4 right-4 text-[#9B9B9B] hover:text-[#1A1A1A] transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-8">
              <h2 className="text-2xl font-display font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
                <Calculator className="text-[#C8A96E]" /> New Risk Assessment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form onSubmit={handleCalculate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Age</label>
                    <input type="number" required value={calcVitals.age} onChange={e => setCalcVitals({...calcVitals, age: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 rounded-lg border border-[#E0DDD7] focus:ring-2 focus:ring-[#1A1A1A] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Heart Rate (bpm)</label>
                    <input type="number" required value={calcVitals.heartRate} onChange={e => setCalcVitals({...calcVitals, heartRate: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 rounded-lg border border-[#E0DDD7] focus:ring-2 focus:ring-[#1A1A1A] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Systolic BP (mmHg)</label>
                    <input type="number" required value={calcVitals.systolicBp} onChange={e => setCalcVitals({...calcVitals, systolicBp: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 rounded-lg border border-[#E0DDD7] focus:ring-2 focus:ring-[#1A1A1A] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Temperature (°C)</label>
                    <input type="number" step="0.1" required value={calcVitals.temperature} onChange={e => setCalcVitals({...calcVitals, temperature: parseFloat(e.target.value) || 0})} className="w-full px-4 py-2 rounded-lg border border-[#E0DDD7] focus:ring-2 focus:ring-[#1A1A1A] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">Oxygen Level (%)</label>
                    <input type="number" required value={calcVitals.oxygenLevel} onChange={e => setCalcVitals({...calcVitals, oxygenLevel: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 rounded-lg border border-[#E0DDD7] focus:ring-2 focus:ring-[#1A1A1A] focus:outline-none" />
                  </div>
                  
                  <button type="submit" className="w-full py-3 bg-[#1A1A1A] text-white rounded-lg font-semibold hover:bg-[#333333] transition-colors mt-4">
                    Calculate Risk
                  </button>
                </form>

                <div className="bg-[#F9F8F6] p-6 rounded-xl border border-[#E0DDD7] flex flex-col items-center justify-center text-center">
                  {calcResult ? (
                    <div className="animate-in fade-in zoom-in duration-300">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-2">Predicted Risk</div>
                      <div className={`text-6xl font-display font-bold mb-2 ${calcResult.risk_level === 'CRITICAL' ? 'text-red-600' : 'text-orange-600'}`}>
                        {calcResult.risk_score}
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-6 ${calcResult.risk_level === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                        {calcResult.risk_level}
                      </div>
                      
                      <div className="text-left w-full border-t border-[#E0DDD7] pt-4 mt-2">
                        <div className="text-sm font-semibold mb-2">Top Drivers:</div>
                        <ul className="text-xs text-[#6B6B6B] list-disc pl-4 space-y-1">
                          {calcResult.reasons.map((r: string, i: number) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                      <div className="mt-4 text-[10px] text-[#9B9B9B]">Model Confidence: {calcResult.confidence}%</div>
                    </div>
                  ) : (
                    <div className="text-[#9B9B9B]">
                      <Calculator size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Submit the vitals form to calculate new risk score in real-time.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
