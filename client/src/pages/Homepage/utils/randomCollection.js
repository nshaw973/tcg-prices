import React, { useEffect, useState } from "react";
import { Loading } from "../../../components/index";
import { useQuery } from "@apollo/client";
import { QUERY_RANDOM } from "../../../utils/queries";
import { Link } from "react-router-dom";

const RandomCollection = () => {
  const { loading, data, refetch } = useQuery(QUERY_RANDOM);
  const [user, setUser] = useState("");
  useEffect(() => {
    loading === false ? setUser(data.randomUser) : setUser("");
    console.log(user)
  }, [data, loading, user]);
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <section className="flex flex-wrap justify-center border-2 p-2 ml-auto mr-auto rounded-xl w-fit">
          {/* Image */}
          <container className="flex flex-col justify-center">
            <img
              src={user.avatar}
              alt="random-user"
              className="size-36 rounded-xl shadow-xl m-2"
            />
            <h1 className="bg-neutral-700 rounded-xl w-36 text-white text-center ml-auto mr-auto">
              {user.username}
            </h1>
          </container>
          {/* Info */}
          <container className="flex flex-col">
            <ul className="m-2">
              <li className="flex flex-row">
                <h1>Collection Worth:</h1>
                <p>${user.collectionWorth?.$numberDecimal}</p>
              </li>
              <li className="flex flex-row">
                <h1>Balance:</h1>${user.balance?.$numberDecimal}
              </li>
              <li className="flex flex-row">
                <h1>Total Cards:</h1>
                <p>{user.cardCount}</p>
              </li>
            </ul>
            <Link
              to={`/collection/${user.userId}`}
              className="underline text-white bg-neutral-700 rounded-xl w-full mt-auto text-center"
            >
              View Collection
            </Link>
          </container>
          {/* Recent Pulls */}
          <container className="flex flex-col">
            <ul className="flex flex-row">
              {user.cardCollection?.map((card, index) => (
                <li key={index}>
                  <img
                    src={card.images.small}
                    alt={`Card ${index}`}
                    className="h-36 m-2 shadow-xl"
                  />
                </li>
              ))}
            </ul>
            <h1 className="bg-neutral-700 rounded-xl ml-2 mr-2 text-white text-center ">
              Recent Pulls:
            </h1>
          </container>
        </section>
      )}
    </>
  );
};

export default RandomCollection;
