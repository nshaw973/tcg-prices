import React, {useEffect, useState} from "react";
import linenBG from "./images/45-degree-fabric-dark.png";
import backgroundImage from "../../images/background/black-linen.png";
import RandomCollection from "./utils/randomCollection";
import { covers } from "./images";
import Sets from "./utils/Sets";

const Homepage = () => {
  const [cover,setCover] = useState(covers[2])

  return (
    <div
      className="h-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Banner */}
      <section
        className={`w-full h-48 bg-white shadow-xl`}
        style={{
          backgroundImage: `url(${cover})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></section>
      {/* Install Bot Link */}
      <section className="flex flex-col w-full justify-center">
        <div className="text-white">
          <h1 className="text-center">Install To Your Server!</h1>
          <div
            className="w-full bg-neutral-700 flex justify-center p-2"
            style={{
              backgroundImage: `url(${linenBG})`,
              backgroundPosition: "center",
            }}
          >
            <a
              href="https://discord.com/oauth2/authorize?client_id=1215412173434785893&permissions=8&integration_type=0&scope=bot"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              Install
            </a>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div>
          <h1 className="text-center text-white">Available Sets:</h1>
          <div className="bg-white">
            <Sets />
          </div>
        </div>
        {/* Random Collection */}
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-white w-full">
            Check this collection out!
          </h1>
          <div className="bg-white">
            <RandomCollection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
