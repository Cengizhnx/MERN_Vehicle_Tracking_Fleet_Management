import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function RoutesChart({ data }) {
  const activeRoutes = data.filter((item) => item.status === "active");
  const passiveRoutes = data.filter((item) => item.status === "passive");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Rota Durumları",
      },
    },
  };
  const data2 = {
    labels: ["Yolda", "Tamamlandı"],
    datasets: [
      {
        label: " ",
        data: [activeRoutes.length, passiveRoutes.length],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-2/4">
      <Doughnut options={options} data={data2} />
    </div>
  );
}
