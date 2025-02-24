import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { Link } from "react-router-dom";
import Auth from '../../utils/auth'

const LoggedIn = () => {
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || {};
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="flex flex-row w-full">
      <div className="dropdown dropdown-end shadow">
        <img
          src={user.avatar}
          className="h-12 ml-4 m-1 mr-4 rounded-xl"
          tabIndex={0}
          role="button"
          alt={`${user.username}-avatar`}
        />
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white text-black rounded-box z-[1] w-52 p-2 shadow border-2"
        >
          <li className="text-black border-b-2 w-full p-2">Hello {user.username}!</li>
          <li className="hover:bg-red-500 hover:text-white rounded-xl">
            <Link to={`/collection/${user.userId}`}>View Collection</Link>
          </li>
          <li className="hover:bg-red-500 hover:text-white rounded-xl">
            <Link to={`/user/${user.userId}/settings`}>Settings</Link>
          </li>
          <li className="hover:bg-red-500 hover:text-white rounded-xl">
            <h1 onClick={logout}>Logout</h1>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoggedIn;
