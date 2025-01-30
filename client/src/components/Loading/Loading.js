import React from "react";

const Loading = () => {

  return (
    <div>
      <div className="flex flex-row w-full justify-center text-black mt-12">
        <h1 className="flex text-xl">Loading</h1>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
};

export default Loading;
