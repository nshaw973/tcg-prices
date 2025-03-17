import React from "react";
import tcgBg from "./images/bgTcgHome.png";
import backgroundImage from "../../images/background/black-linen.png";

const Homepage = () => {
  return (
    <div className="h-full bg-white">
      {/* Banner */}
      <section
        className="w-full h-1/3 bg-white shadow-xl"
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
          <h1>
            Install To Your Server!
          </h1>
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
      {/* Random Collection */}
      <section>
        <h1>Check out this Collection!</h1>
        <div>

        </div>
      </section>
    </div>
  );
};

export default Homepage;
