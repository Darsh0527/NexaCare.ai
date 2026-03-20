"use client";

import React from "react";
import DoctorDashboard from "@/app/doctor/page";

export default function DashboardPage() {
  // For MVP we reuse the existing clinician dashboard UI.
  // Admin-specific UI will be wired in a later task.
  return <DoctorDashboard />;
}

