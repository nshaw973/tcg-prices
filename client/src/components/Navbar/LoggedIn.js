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
      <h1 className="m-auto">Hello {user.username}!</h1>
      <div className="dropdown dropdown-end shadow">
        <img
          src={user.avatar}
          className="h-12 ml-4 m-1 mr-4 rounded-xl"
          tabIndex={0}
          role="button"
        />
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 text-white rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <Link to={`/collection/${user.userId}`}>View Collection</Link>
          </li>
          <li>
            <Link to={`/user/${user.useeId}/settings`}>Settings</Link>
          </li>
          <li>
            <h1 onClick={logout}>Logout</h1>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoggedIn;
