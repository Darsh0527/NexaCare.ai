"use client";

import { forecastData } from "@/data/mockData";
import { AlertCircle, TrendingUp, Users, Bed } from "lucide-react";
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

export default function ForecastPage() {
  const labels = forecastData.map(d => `Day ${d.day}`);
  
  const bedData = {
    labels,
    datasets: [
      {
        label: 'Beds Needed',
        data: forecastData.map(d => d.beds_needed),
        borderColor: '#1A1A1A',
        backgroundColor: 'rgba(26, 26, 26, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const staffData = {
    labels,
    datasets: [
      {
        label: 'Staff Needed',
        data: forecastData.map(d => d.staff_needed),
        backgroundColor: '#C8A96E',
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  // Find peak demand
  const peakBedDay = forecastData.reduce((prev, current) => (prev.beds_needed > current.beds_needed) ? prev : current);
  
  // Find first day with ICU > 0.75
  const surgeDay = forecastData.find(d => d.icu_prob > 0.75);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#1A1A1A]">Hospital Operations Forecast</h1>
          <p className="text-[#6B6B6B] text-sm mt-1">7-Day Resource Planning & AI Predictions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1A1A1A] text-white rounded-xl p-6 shadow-sm flex items-start gap-4">
          <TrendingUp className="text-[#C8A96E] shrink-0 mt-1" size={24} />
          <div>
            <div className="text-sm text-[#9B9B9B] uppercase font-bold tracking-wider mb-1">Peak Demand</div>
            <div className="text-2xl font-display font-bold mb-1">Day {peakBedDay.day} — {peakBedDay.beds_needed} beds</div>
            <p className="text-sm text-[#9B9B9B]">Maximum resource utilization expected this week.</p>
          </div>
        </div>

        <div className={`rounded-xl p-6 shadow-sm flex items-start gap-4 border ${surgeDay ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <AlertCircle className={`shrink-0 mt-1 ${surgeDay ? 'text-red-600' : 'text-green-600'}`} size={24} />
          <div>
            <div className={`text-sm uppercase font-bold tracking-wider mb-1 ${surgeDay ? 'text-red-700' : 'text-green-700'}`}>Surge Warning</div>
            <div className={`text-2xl font-display font-bold mb-1 ${surgeDay ? 'text-red-900' : 'text-green-900'}`}>
              {surgeDay ? `Recommend activating surge protocol by Day ${surgeDay.day}` : "No surge expected"}
            </div>
            <p className={`text-sm ${surgeDay ? 'text-red-700' : 'text-green-700'}`}>
              {surgeDay ? `ICU probability exceeds 75% threshold starting Day ${surgeDay.day}.` : "All capacity within normal operating limits."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#E0DDD7] p-6 shadow-sm flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-[#1A1A1A] flex items-center gap-2">
              <Bed className="text-[#6B6B6B]" size={18} /> Bed Occupancy Forecast
            </h2>
          </div>
          <div className="flex-1 min-h-0">
            <Line data={bedData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0DDD7] p-6 shadow-sm flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-[#1A1A1A] flex items-center gap-2">
              <Users className="text-[#6B6B6B]" size={18} /> Staffing Requirements
            </h2>
          </div>
          <div className="flex-1 min-h-0">
            <Bar data={staffData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E0DDD7] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E0DDD7] bg-[#F9F8F6]">
          <h2 className="font-semibold text-[#1A1A1A]">Daily ICU Surge Probability</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 divide-x divide-y md:divide-y-0 divide-[#E0DDD7]">
          {forecastData.map(day => {
            const isWarning = day.icu_prob > 0.75;
            return (
              <div key={day.day} className={`p-5 text-center transition-colors ${isWarning ? 'bg-red-50/50' : 'hover:bg-[#F9F8F6]'}`}>
                <div className="text-sm font-bold text-[#6B6B6B] mb-2">Day {day.day}</div>
                
                {/* Gauge visualization (simple SVG) */}
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      className="text-[#E0DDD7]"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      cx="18"
                      cy="18"
                      r="16"
                    />
                    <circle
                      className={isWarning ? "text-red-500" : "text-[#C8A96E]"}
                      strokeDasharray={`${day.icu_prob * 100.53}, 100.53`}
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      cx="18"
                      cy="18"
                      r="16"
                    />
                  </svg>
                  <div className={`absolute inset-0 flex items-center justify-center text-[13px] font-bold ${isWarning ? "text-red-600" : "text-[#1A1A1A]"}`}>
                    {Math.round(day.icu_prob * 100)}%
                  </div>
                </div>
                
                {isWarning && (
                  <div className="text-[10px] font-bold text-red-600 uppercase tracking-wider mt-1">Warning</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
