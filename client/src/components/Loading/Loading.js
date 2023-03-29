import React from "react";

function Loading() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <i className="animate-bounce fas fa-truck fa-5x" style={{color:"#080c1a"}}></i>
        <p className="text-2xl mt-5">Loading . . .</p>
      </div>
    </div>
  );
}

export default Loading;
