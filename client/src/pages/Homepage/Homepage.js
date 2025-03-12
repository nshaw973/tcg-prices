import React from "react";
import tcgBg from './images/bgTcgHome.png'

const Homepage = () => {
  return (
    <>
        <section className="w-full h-1/3 bg-white shadow-xl"
        style={{
          backgroundImage: `url(${tcgBg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
        >
        </section>
        <section className="h-full bg-white">
          <h1>Link to Bot</h1>
          <a href="https://www.google.com" target="_blank" rel="noreferrer">Discord Bot</a>

        </section>
    </>
  );
};

export default Homepage;
