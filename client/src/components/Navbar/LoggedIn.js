import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { Link } from "react-router-dom";

const LoggedIn = () => {
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || {};
  return (
    <div className="flex flex-row w-full">
      <h1 className="m-auto">Hello {user.username}!</h1>
      <Link to={`/collection/${user.userId}`}>
        <img src={user.avatar} className="h-12 ml-4 m-1 mr-4 rounded-xl" />
      </Link>
    </div>
  );
};

export default LoggedIn;
