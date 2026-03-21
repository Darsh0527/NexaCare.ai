export interface Vitals {
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  oxygenLevel: number;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  vitals: Vitals;
  riskScore: number;
  riskLevel: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  riskReasons: string[];
}

export const patients: Patient[] = [
  {
    id: 1,
    name: "Ravi Sharma",
    age: 67,
    gender: "Male",
    diagnosis: "Diabetes + Hypertension",
    vitals: { heartRate: 102, bloodPressure: "158/95", temperature: 37.2, oxygenLevel: 94 },
    riskScore: 92,
    riskLevel: "CRITICAL",
    riskReasons: [
      "HbA1c critically elevated",
      "Blood pressure above safe threshold",
      "Missed 3 follow-up appointments"
    ]
  },
  {
    id: 2,
    name: "Sunita Rao",
    age: 45,
    gender: "Female",
    diagnosis: "Sepsis Risk",
    vitals: { heartRate: 118, bloodPressure: "88/60", temperature: 39.1, oxygenLevel: 91 },
    riskScore: 95,
    riskLevel: "CRITICAL",
    riskReasons: [
      "Oxygen saturation dangerously low",
      "High temperature indicating infection",
      "Heart rate severely elevated"
    ]
  },
  {
    id: 3,
    name: "Meera Joshi",
    age: 72,
    gender: "Female",
    diagnosis: "Pneumonia",
    vitals: { heartRate: 95, bloodPressure: "135/85", temperature: 38.8, oxygenLevel: 93 },
    riskScore: 88,
    riskLevel: "CRITICAL",
    riskReasons: [
      "Age above 65 high risk group",
      "Respiratory infection detected",
      "Oxygen levels declining trend"
    ]
  },
  {
    id: 4,
    name: "Arjun Patel",
    age: 71,
    gender: "Male",
    diagnosis: "Heart Failure",
    vitals: { heartRate: 88, bloodPressure: "145/90", temperature: 36.9, oxygenLevel: 95 },
    riskScore: 85,
    riskLevel: "CRITICAL",
    riskReasons: [
      "Chronic heart failure history",
      "Blood pressure elevated",
      "Age related risk factor"
    ]
  },
  {
    id: 5,
    name: "Priya Mehta",
    age: 54,
    gender: "Female",
    diagnosis: "COPD",
    vitals: { heartRate: 92, bloodPressure: "128/82", temperature: 37.4, oxygenLevel: 92 },
    riskScore: 78,
    riskLevel: "HIGH",
    riskReasons: [
      "COPD exacerbation risk",
      "Oxygen borderline low",
      "Recent medication change"
    ]
  },
  {
    id: 6,
    name: "Deepak Gupta",
    age: 68,
    gender: "Male",
    diagnosis: "Cancer",
    vitals: { heartRate: 84, bloodPressure: "122/78", temperature: 37.1, oxygenLevel: 96 },
    riskScore: 79,
    riskLevel: "HIGH",
    riskReasons: [
      "Chemotherapy immune suppression",
      "Age related vulnerability",
      "Fatigue and weight loss noted"
    ]
  },
  {
    id: 7,
    name: "Anita Desai",
    age: 58,
    gender: "Female",
    diagnosis: "Stroke Risk",
    vitals: { heartRate: 78, bloodPressure: "162/98", temperature: 36.8, oxygenLevel: 97 },
    riskScore: 74,
    riskLevel: "HIGH",
    riskReasons: [
      "Blood pressure critically high",
      "Prior TIA history",
      "Cholesterol levels elevated"
    ]
  },
  {
    id: 8,
    name: "Vikram Singh",
    age: 63,
    gender: "Male",
    diagnosis: "Kidney Disease",
    vitals: { heartRate: 76, bloodPressure: "138/86", temperature: 36.7, oxygenLevel: 97 },
    riskScore: 61,
    riskLevel: "HIGH",
    riskReasons: [
      "Creatinine levels elevated",
      "Reduced kidney function",
      "Fluid retention detected"
    ]
  },
  {
    id: 9,
    name: "Kiran Nair",
    age: 55,
    gender: "Female",
    diagnosis: "Liver Disease",
    vitals: { heartRate: 72, bloodPressure: "118/76", temperature: 36.9, oxygenLevel: 98 },
    riskScore: 56,
    riskLevel: "MEDIUM",
    riskReasons: [
      "Liver enzyme levels high",
      "Moderate risk profile",
      "Stable but monitoring required"
    ]
  },
  {
    id: 10,
    name: "Rohit Kumar",
    age: 49,
    gender: "Male",
    diagnosis: "Post-Surgery",
    vitals: { heartRate: 68, bloodPressure: "112/72", temperature: 36.6, oxygenLevel: 99 },
    riskScore: 43,
    riskLevel: "MEDIUM",
    riskReasons: [
      "Post-operative recovery phase",
      "Vitals stable and improving",
      "Low immediate risk"
    ]
  }
];

export interface Alert {
  id: number;
  patientName: string;
  patientId: number;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  reason: string;
  timeAgo: string;
}

export const alerts: Alert[] = [
  { id: 1, patientName: "Sunita Rao", patientId: 2, severity: "CRITICAL", reason: "Sepsis imminent", timeAgo: "10 minutes ago" },
  { id: 2, patientName: "Ravi Sharma", patientId: 1, severity: "HIGH", reason: "HbA1c critical level", timeAgo: "25 minutes ago" },
  { id: 3, patientName: "Meera Joshi", patientId: 3, severity: "HIGH", reason: "Oxygen declining trend", timeAgo: "1 hour ago" },
  { id: 4, patientName: "Arjun Patel", patientId: 4, severity: "MEDIUM", reason: "BP threshold crossed", timeAgo: "2 hours ago" },
  { id: 5, patientName: "Priya Mehta", patientId: 5, severity: "MEDIUM", reason: "COPD flare risk", timeAgo: "3 hours ago" }
];

export interface ForecastDay {
  day: number;
  beds_needed: number;
  staff_needed: number;
  icu_prob: number;
}

export const forecastData: ForecastDay[] = [
  { day: 1, beds_needed: 42, staff_needed: 18, icu_prob: 0.65 },
  { day: 2, beds_needed: 45, staff_needed: 19, icu_prob: 0.70 },
  { day: 3, beds_needed: 48, staff_needed: 21, icu_prob: 0.78 },
  { day: 4, beds_needed: 44, staff_needed: 19, icu_prob: 0.68 },
  { day: 5, beds_needed: 50, staff_needed: 22, icu_prob: 0.82 },
  { day: 6, beds_needed: 47, staff_needed: 20, icu_prob: 0.74 },
  { day: 7, beds_needed: 52, staff_needed: 23, icu_prob: 0.85 }
];

export const chatResponses: Record<string, string> = {
  "Who is most at risk today?": "Sunita Rao has the highest risk score of 95.\nImmediate review recommended due to sepsis indicators.",
  "Who is likely to be readmitted this week?": "Ravi Sharma and Meera Joshi have the highest\n30-day readmission probability based on current trends.",
  "How many ICU beds do we need Thursday?": "Forecast shows 82% ICU surge probability on Day 5.\nRecommend preparing 6 additional ICU beds by Wednesday.",
  "Which patients can be safely discharged?": "Rohit Kumar (risk 43) and Kiran Nair (risk 56)\nshow stable vitals and are candidates for discharge review.",
  "Show me patients with oxygen issues": "Sunita Rao (O2 91%) and Priya Mehta (O2 92%)\nare below safe threshold. Immediate respiratory\nassessment recommended."
};
