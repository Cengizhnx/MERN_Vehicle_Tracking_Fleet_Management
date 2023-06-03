import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export function FleetsChart() {
  const { data } = useFetch("/fleet/getAllFleets");
  const user = useSelector((state) => state.users.user);
  const filtered = data.filter((item) => item.fleetOwner === user._id);

  const activeFleets = filtered.filter((item) => item.status === "active");
  const passiveFleets = filtered.filter((item) => item.status === "passive");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${
          "Filo Durumları" +
          " - " +
          (activeFleets.length + passiveFleets.length)
        }`,
      },
    },
  };
  const data2 = {
    labels: ["Aktif", "Pasif"],
    datasets: [
      {
        label: " ",
        data: [activeFleets.length, passiveFleets.length],
        backgroundColor: ["rgba(255, 206, 86, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba((54, 162, 235, 1)"],
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
