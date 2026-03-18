"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RiskChartProps {
  dataPoints: number[];
  labels: string[];
}

export default function RiskChart({ dataPoints, labels }: RiskChartProps) {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "AI Risk Score",
        data: dataPoints,
        borderColor: "rgb(200, 169, 110)", // Accent gold
        backgroundColor: "rgba(200, 169, 110, 0.2)",
        tension: 0.4,
      },
      {
        fill: true,
        label: "Critical Threshold",
        data: dataPoints.map(() => 75), // Fixed line at 75
        borderColor: "rgba(255, 99, 132, 0.5)",
        backgroundColor: "rgba(255, 99, 132, 0.0)",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Risk Trajectory (Last 24h)" },
    },
    scales: {
      y: { min: 0, max: 100 },
    },
  };

  return <Line options={options} data={data} />;
}
