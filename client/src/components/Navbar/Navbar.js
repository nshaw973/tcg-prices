import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../images/background/45-degree-fabric-dark.png";
import { tabs, categories } from "./lists";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Homepage");
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
    <div className="w-full flex flex-col">
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
        <br />
        <div className="justify-self-center">
          <form onSubmit={handleSubmit} className="flex content-center">
            {/* Search type selection */}
            <select
              tabIndex={0}
              className="w-fit pl-2"
              onChange={(e) => setQueryType(e.target.value)} // Update queryType on selection change
              value={queryType}
            >
              <option value="name">Name</option>
              <option value="id">Id</option>
            </select>
            {/* Search input field */}
            <input
              type="text"
              name="query"
              id="query"
              placeholder="Search by..."
              className="bg-white text-black border-2 border-black border-l-0"
            />
            {/* Search button */}
            <button type="submit" className="btn btn-sm rounded-l-none">
              Search
            </button>
          </form>
        </div>
        <div>
          <ul className="flex flex-row w-full justify-end">
            {tabs.map((tab, index) => (
              <li key={index}>
                <Link to={tab.link}>
                  <h1
                    className={`p-2 ml-2 mr-2 border-b-2 hover:border-neutral-600 flex-1 shadow-md text-xs ${
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
            ))}
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="bg-neutral-800 w-full flex flex-row"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="ml-auto mr-auto flex flex-row">
          {categories.map((category, index) => (
            <Link to={`/categories/${category.name}`} key={index} className="p-2 w-18 underline text-white">
              {category.alt}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
