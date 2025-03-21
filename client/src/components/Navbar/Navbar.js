import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../images/background/45-degree-fabric-dark.png";
import { categories } from "./lists";
import Auth from "../../utils/auth";
import LoggedIn from "./LoggedIn";

const Navbar = () => {
  const [queryType, setQueryType] = useState("name");
  const navigate = useNavigate(); // Correct use of useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.query.value.trim().toLowerCase(); // Get and trim the query value from input
    if (!query) {
      return;
    }
    const destination = `/search?type=${queryType}&query=${query}`;
    navigate(destination);
  };

  return (
    <div className="w-full flex flex-col z-[1]">
      {/* 1st Line */}
      <div className="bg-white text-black flex flex-row justify-between h-14">
        <Link to="/">
          <div className="flex flex-row mt-4 ml-2">
            <img
              className="w-6 h-6"
              alt="Poké Ball icon"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/512px-Pok%C3%A9_Ball_icon.svg.png?20161023215848"
            />
            <h1 className="text-xs lg:text-md mt-1">DiscordTCG Bot Collection</h1>
          </div>
        </Link>
        <div>
          <ul className="flex flex-row w-full">
            {Auth.loggedIn() ? (
              <>
                <LoggedIn />
              </>
            ) : (
              <>
                <li className="w-full">
                  <Link to={"/login"}>
                    <h1
                      className='text-lg h-full w-full m-3 rounded-xl'
                    >
                      Login
                    </h1>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* 2nd Line */}
      <div
        className="flex flex-row justify-between p-2"
        style={{
          backgroundColor: "#b51f1f",
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <br />
        {/* Search Form */}
        <div className="ml-auto mr-auto ">
          <form onSubmit={handleSubmit} className="flex content-center ">
            {/* Search type selection */}
            <div className="join">
              <div>
                <div>
                  <input
                    className="input join-item input-sm bg-white border-1 border-black text-black" 
                    type="text"
                    name="query"
                    id="query"
                    placeholder="Search by..."
                  />
                </div>
              </div>
              <select
                className="select join-item select-sm bg-white border-l-1 border-black text-black"
                tabIndex={0}
                onChange={(e) => setQueryType(e.target.value)} // Update queryType on selection change
                value={queryType}
              >
                <option disabled selected>
                  Filter
                </option>
                <option value="name">Name</option>
                <option value="id">Id</option>
              </select>
              <div className="indicator">
                <button className="btn btn-sm join-item bg-white text-black border-black border-1" type="submit">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Right Side Tabs */}
      </div>
      {/* Tabs */}
      <div
        className="bg-neutral-800 w-full flex flex-row justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="flex flex-row w-full justify-center">
          {categories.map((category, index) => (
            <Link
              to={`/categories/${category.name}`}
              key={index}
              className="btn btn-sm w-24 rounded-none bg-white text-black hover:text-white"
            >
              {category.alt}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
