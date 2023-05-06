import React from "react";
import useFetch from "../../hooks/useFetch";
import CountUp from "react-countup";

function FleetCard() {
  const { data, loading, error, reFetchUser } = useFetch("/fleet/getAllFleets");

  // const filtered = data.filter((item) => item.status === "active");

  return (
    <div class="flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-r-4 border-green-300">
      <div class="flex justify-between w-full">
        <div>
          <div class="p-2">
            <i className="fas fa-building opacity-80"></i>
          </div>
        </div>
        <div>
          <div
            //   style="padding-top: 0.1em; padding-bottom: 0.1rem"
            class="flex items-center text-xs px-3 bg-green-200 text-green-800 rounded-full"
          >
            25%
          </div>
        </div>
      </div>
      <div className="text-center">
        <CountUp
          className="font-bold text-5xl text-center"
          end={data.length}
        ></CountUp>{" "}
        <div class="font-bold text-sm">Filo</div>
      </div>
    </div>
  );
}

export default FleetCard;
