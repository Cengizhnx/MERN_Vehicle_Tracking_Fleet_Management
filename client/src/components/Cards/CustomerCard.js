import React from "react";
import useFetch from "../../hooks/useFetch";
import CountUp from "react-countup";

function CustomerCard() {
  const { data } = useFetch("/customer/getAllCustomers");

  // const filtered = data.filter(
  //   (item) => item.name !== "admin" && item.status === "active"
  // );

  const filtered = data.filter((item) => item.name !== "admin");

  return (
    <div class="flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-r-4 border-blue-300">
      <div class="flex justify-between w-full">
        <div>
          <div class="p-2">
            <i class="fas fa-users opacity-80"></i>
          </div>
        </div>
        <div>
          <div
            //   style="padding-top: 0.1em; padding-bottom: 0.1rem"
            class="flex items-center text-xs px-3 bg-blue-200 text-blue-800 rounded-full"
          >
            100%
          </div>
        </div>
      </div>
      <div className="text-center">
        <CountUp
          className="font-bold text-5xl text-center"
          end={filtered.length}
        ></CountUp>
        <div class="font-bold text-sm">Müşteri</div>
      </div>
    </div>
  );
}

export default CustomerCard;
