"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ClinicianDashboard from "@/components/ClinicianDashboard";

export default function PatientsPage() {
  const router = useRouter();

  return (
    <ClinicianDashboard
      showRiskCalculator={false}
      onSelectPatient={(patientId) => {
        router.push(`/dashboard/patients/${patientId}`);
      }}
    />
  );
}

