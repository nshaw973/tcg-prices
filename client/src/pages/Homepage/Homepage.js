import React from "react";
import tcgBg from "./images/bgTcgHome.png";
import backgroundImage from "../../images/background/black-linen.png";
import RandomCollection from "./utils/randomCollection";
import Sets from "./utils/Sets";

const Homepage = () => {
  return (
    <div className="h-full bg-white">
      {/* Banner */}
      <section
        className="w-full h-36 bg-white shadow-xl"
        style={{
          backgroundImage: `url(${tcgBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></section>
      {/* Install Bot Link */}
      <section
        className="flex flex-col bg-neutral-700 p-6"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="ml-auto mr-auto text-white">
          <h1>Install To Your Server!</h1>
          <a
            href="https://discord.com/oauth2/authorize?client_id=1215412173434785893&permissions=8&integration_type=0&scope=bot"
            target="_blank"
            rel="noreferrer"
            className="btn w-full"
          >
            Install
          </a>
        </div>
      </section>
      <section className="w-full">
        <div>
          <h1>Available Sets:</h1>
          <Sets />
        </div>
        {/* Random Collection */}
        <div className="flex justify-center">
          <RandomCollection />
        </div>
      </section>
    </div>
  );
};

export default Homepage;
