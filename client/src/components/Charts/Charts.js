import React from "react";
import { RoutesChart } from "./RoutesChart";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { FleetsChart } from "./FleetsChart";

function Charts() {
  const { data, loading, error, reFetchUser } = useFetch("/route/getAllRoutes");
  const user = useSelector((state) => state.users.user);
  const filtered = data.filter((item) => item.customer_id === user._id);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        filtered.length > 0 &&
        <>
          <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-3 mt-5 flex-row w-1/2 p-5 rounded bg-white items-center justify-around">
            <RoutesChart data={filtered}></RoutesChart>
          </div>
          <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-3 mt-5 flex-row w-1/2 p-5 rounded bg-white items-center justify-around">
            <FleetsChart></FleetsChart>
          </div>
        </>
      )}
    </>
  );
}

export default Charts;
