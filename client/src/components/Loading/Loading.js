import React, { useState, useEffect } from "react";
import images from "./LoadingImages/index";

const Loading = () => {
  const getRandomImg = () => {
    const max = images.length;
    const randomIndex = Math.floor(Math.random() * max);
    return randomIndex;
  };
  const [currentImg, setCurrentImg] = useState(images[getRandomImg()]);
  useEffect(() => {
    // Set an interval to run every 1000ms (1 second)
    const interval = setInterval(() => {
      setCurrentImg(images[getRandomImg()]);
    }, 2000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full justify-center text-black mt-12">
        <h1 className="flex text-xl">Loading</h1>
        <span className="loading loading-dots loading-lg"></span>
      </div>
      <img
        src={currentImg}
        className="animate-fade-right animate-infinite animate-duration-[2000ms] animate-ease-out w-48"
      />
    </div>
  );
};

export default Loading;
