"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function ComparisonChart({ pokemon1, pokemon2 }) {
  const labels = pokemon1.stats.map((s) => s.stat.name);

  const data1 = pokemon1.stats.map((s) => s.base_stat);
  const data2 = pokemon2.stats.map((s) => s.base_stat);

  const data = {
    labels,
    datasets: [
      {
        label: pokemon1.name,
        data: data1,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
      {
        label: pokemon2.name,
        data: data2,
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(239, 68, 68, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${pokemon1.name} vs ${pokemon2.name} - Stats Comparison`,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 255,
      },
    },
  };

  return (
    <div className="bg-white border-4 border-gray-800 p-6 pixel-border shadow-lg">
      <Radar data={data} options={options} />
    </div>
  );
}