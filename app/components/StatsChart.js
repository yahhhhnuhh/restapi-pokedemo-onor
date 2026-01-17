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

export default function StatsChart({ pokemon }) {
  const labels = pokemon.stats.map((s) => s.stat.name);
  const values = pokemon.stats.map((s) => s.base_stat);

  const data = {
    labels,
    datasets: [
      {
        label: pokemon.name,
        data: values,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
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
        text: `${pokemon.name} - Base Stats`,
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