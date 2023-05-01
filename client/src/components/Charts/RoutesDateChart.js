import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function RoutesDateChart({ data }) {
  const months = data.filter((item) => item.createdAt);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = data.map((item) => moment(item.createdAt).format("MMMM"));
  console.log("L", labels);
  const data2 = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [months.length],
        backgroundColor: "rgba(53, 162, 235, 0.6)",
      },
    ],
  };
  return <Bar options={options} data={data2} />;
}
