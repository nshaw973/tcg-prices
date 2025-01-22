import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../images/background/45-degree-fabric-dark.png";
import { searchQuery } from "./searchQuery/searchQuery";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Homepage");
  const navigate = useNavigate()
  const tabs = [
    {
      name: "Profile",
      link: "/profile",
    },
    {
      name: "Settings",
      link: "/settings",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault()
    const query = e.target.query.value
    if(!query) {
      return
    }
    navigate(`/search?query=${query}`)
    searchQuery(query)
  }

  return (
    <div className="w-screen flex flex-col">
      {/* 1st Line */}
      <div className="bg-white">
        <Link to="/">
          <h1>Daily TCG Prices</h1>
        </Link>
      </div>
      {/* 2nd Line */}

      <div
        className="flex flex-row justify-between p-2 text-white"
        style={{
          backgroundColor: "#b51f1f",
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <br></br>
        <div className="justify-self-center">
          <form
            action="search"
            method="get"
            className="flex content-center"
            onSubmit={(e) => handleSearch(e)
            }
          >
            <label htmlFor="query" />
            <input
              type="text"
              name="query"
              id="query"
              placeholder="Search Cards..."
              className="bg-white text-black"
            />
            <button type="submit" className="btn btn-xs rounded-l-none">
              Search
            </button>
          </form>
        </div>
        <h1 className="font-bold ">Welcome User!</h1>
      </div>
      {/* Tabs */}
      <div className="bg-neutral-800"         style={{
          backgroundImage: `url(${backgroundImage})`,
        }}>
        <ul className="flex flex-row w-svw justify-end">
          {tabs.map((tab, index) => {
            return (
              <li>
                <Link to={`${tab.link}`}>
                  <h1
                    className={`p-2 ml-2 mr-2 border-b-2 hover:border-neutral-600 flex-1 shadow-md ${
                      activeTab === tab.name
                        ? `border-black`
                        : `border-neutral-400`
                    }`}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    {tab.name}
                  </h1>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
