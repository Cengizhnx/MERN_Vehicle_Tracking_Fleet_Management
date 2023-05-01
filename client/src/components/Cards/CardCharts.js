import React from "react";
import { RoutesChart } from "./RoutesChart";
import { FleetsChart } from "./FleetsChart";

function CardCharts() {
  return (
    <div className="flex flex-row space-x-5">
      <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-3 mt-5 flex-row w-1/2 p-5 rounded bg-white items-center justify-around">
        <RoutesChart></RoutesChart>
      </div>
      <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-3 mt-5 flex-row w-1/2 p-5 rounded bg-white items-center justify-around">
        <FleetsChart></FleetsChart>
      </div>
    </div>
  );
}

export default CardCharts;
