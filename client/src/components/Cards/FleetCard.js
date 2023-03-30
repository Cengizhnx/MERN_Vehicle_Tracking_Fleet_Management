import React from "react";
import useFetch from "../../hooks/useFetch";

function FleetCard() {
  const { data, loading, error, reFetchUser } = useFetch("/fleet/getAllFleets");
  return (
    <div class="flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-r-4 border-green-300">
      <div class="flex justify-between w-full">
        <div>
          <div class="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </div>
        </div>
        <div>
          <div
            //   style="padding-top: 0.1em; padding-bottom: 0.1rem"
            class="flex items-center text-xs px-3 bg-purple-200 text-purple-800 rounded-full"
          >
            25%
          </div>
        </div>
      </div>
      <div>
        <div class="font-bold text-5xl text-center">{data.length}</div>
        <div class="font-bold text-sm">Filo</div>
      </div>
    </div>
  );
}

export default FleetCard;
