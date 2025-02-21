import React, { useState, useEffect } from "react";
import images from "./LoadingImages/index";

const Loading = () => {
  const [prev, setPrev] = useState(-1); // Track the previous image index
  const [currentImg, setCurrentImg] = useState(images[0]); // Initialize with the first image
  const [time, setTime] = useState(1500); // Initial interval time

  useEffect(() => {
    const getRandomImg = () => {
      const max = images.length;
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * max);
      } while (randomIndex === prev); // Ensure the new index is different from the previous one
      setPrev(randomIndex); // Update the previous index
      return randomIndex;
    };

    const interval = setInterval(() => {
      setCurrentImg(images[getRandomImg()]); // Update the current image
      setTime((prevTime) => (prevTime === 1500 ? 2000 : prevTime)); // Change time after the first run
    }, time);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [time, images, prev]);

  return (
    <div className="flex flex-col">
      <img
        src={currentImg}
        className="animate-rotate-y animate-infinite animate-duration-[2000ms] animate-ease-linear w-48 mt-12"
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
