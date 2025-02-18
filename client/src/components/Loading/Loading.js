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
    let time = 2000;
    let interval;
  
    const startInterval = () => {
      interval = setInterval(() => {
        setCurrentImg(images[getRandomImg()]);
      }, time);
    };
  
    startInterval();
    return () => clearInterval(interval);
  }, [currentImg]);

  return (
    <div className="flex flex-col">
      <img
        src={currentImg}
        className="animate-fade-right animate-infinite animate-duration-[2000ms] animate-ease-linear w-48 mt-12"
        alt="loading-cards"
      />
      <div className="flex flex-row w-full justify-center text-white mt-12">
        <h1 className="flex text-xl">Loading</h1>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
};

export default Loading;
