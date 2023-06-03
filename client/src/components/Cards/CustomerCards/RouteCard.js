import React from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";

function RouteCard() {
  const { data } = useFetch("/route/getAllRoutes");
  const user = useSelector((state) => state.users.user);
  const filtered = data?.filter((item) => item.customer_id === user._id);

  return (
    <div class="flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-yellow-300">
      <div class="flex justify-between w-full">
        <div>
          <div class="p-2">
            <i className="fas fa-route opacity-80"></i>
          </div>
        </div>
        <div>
          <div
            //   style="padding-top: 0.1em; padding-bottom: 0.1rem"
            class="flex items-center text-xs px-3 bg-yellow-200 text-yellow-800 rounded-full"
          >
            Rota
          </div>
        </div>
      </div>
      <div className="text-center">
        <CountUp
          className="font-bold text-5xl text-center"
          end={filtered.length}
        ></CountUp>{" "}
        <div class="font-bold text-sm">Rota</div>
      </div>
    </div>
  );
}

export default RouteCard;
