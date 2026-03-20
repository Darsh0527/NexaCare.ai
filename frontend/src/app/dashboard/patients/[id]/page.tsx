"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ClinicianDashboard from "@/components/ClinicianDashboard";

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <ClinicianDashboard
      selectedPatientId={params.id}
      showRiskCalculator={true}
      onSelectPatient={(patientId) => {
        router.push(`/dashboard/patients/${patientId}`);
      }}
    />
  );
}

