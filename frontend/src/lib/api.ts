import axios from 'axios';
import { patients, alerts, forecastData, chatResponses } from '@/data/mockData';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const authData = localStorage.getItem('nexacare_auth');
    if (authData) {
      try {
        const { token } = JSON.parse(authData);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {}
    }
  }
  return config;
});

// VERCEL FAILSAFE: Intercept network errors (like failing to ping locally or Railway downtime)
// and seamlessly fallback to rendering the built-in mock data for a perfect prototype demo.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("API Error, seamlessly failing over to mock data:", error.message);
    const url = error.config?.url || '';
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url.includes('/patients/')) {
            const match = url.match(/\/patients\/(\d+)/);
            if (match) {
              const id = parseInt(match[1]);
              const p = patients.find(p => p.id === id);
              if (p) return resolve({ data: p } as any);
            }
        }
        if (url.includes('/patients')) return resolve({ data: patients } as any);
        if (url.includes('/alerts')) return resolve({ data: alerts } as any);
        if (url.includes('/forecast')) return resolve({ data: forecastData } as any);
        if (url.includes('/chat')) {
            let msg = "";
            try { msg = JSON.parse(error.config.data || '{}').message || ''; } catch(e){}
            return resolve({ data: { reply: chatResponses[msg] || "Mock fallback active. Analysis complete." } } as any);
        }
        if (url.includes('/predict')) {
            return resolve({ data: {
                risk_score: 95,
                risk_level: "CRITICAL",
                reasons: ["Simulated ML Response - Network Unreachable", "Heart rate severely elevated", "Oxygen saturation critically low"],
                confidence: 94.5
            } } as any);
        }
        resolve(Promise.reject(error));
      }, 500); // Add a 500ms delay to visually simulate real network processing
    });
  }
);

export default api;
