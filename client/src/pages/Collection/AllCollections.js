import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import { Loading } from "../../components";
import { Link } from "react-router-dom";

const AllCollections = () => {
  const { loading, error, data } = useQuery(QUERY_USERS);
  useEffect(() => {
    console.log(data);
  }, [data]);
  // Do not delete this
  if (!data) return <h1>Loading...</h1>;
  const { users } = data;
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>Error: {error.message}</h1>
      ) : (
        <div>
          <h1>Here are all the users! Click to view their collections</h1>
          <ul className="animate-fade flex flex-wrap">
            {users.map((user, index) => {
              return (
                <li
                  className="flex flex-row text-black rounded-xl m-8"
                  key={index}
                >
                  <img src={user.avatar} className="w-36 rounded-xl" />
                  <div className="flex flex-col bg-white rounded-xl p-4 ml-2">
                    <h1>{user.username}</h1>
                    <h1>Balance: ${user.balance.$numberDecimal}</h1>
                    <h1>Cards Total: {user.cardCount}</h1>
                    <Link
                      to={`/collection/${user.userId}`}
                      className="flex justify-end hover:text-blue-400 pt-2 mt-auto"
                    >
                      View {user.username}'s Collection!
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default AllCollections;
