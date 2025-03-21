import React, { useEffect, useState } from "react";
import { Loading } from "../../../components/index";
import { useQuery } from "@apollo/client";
import { QUERY_RANDOM } from "../../../utils/queries";
import { Link } from "react-router-dom";

const RandomCollection = () => {
  const { loading, data } = useQuery(QUERY_RANDOM);
  const [user, setUser] = useState("");
  useEffect(() => {
    loading === false ? setUser(data.randomUser) : setUser("");
  }, [data, loading, user]);
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
        <section className="flex flex-wrap justify-center border-2 p-2 m-2 ml-auto mr-auto rounded-xl w-full">
          {/* Image */}
          <container className="flex flex-col w-1/4 h-fit p-1 justify-end">
            <img
              src={user?.avatar}
              alt="random-user"
              className=" rounded-xl shadow-xl mb-2"
            />
            <h1 className="bg-neutral-700 rounded-xl w-full text-white text-center ml-auto mr-auto">
              {user?.username}
            </h1>
          </container>
          {/* Info */}
          <container className="flex flex-col w-1/4 justify-between p-1">
            <ul className="">
              <li className="flex flex-row">
                <h1>Worth:</h1>
                <p>${user?.collectionWorth?.$numberDecimal}</p>
              </li>
              <li className="flex flex-row">
                <h1>Balance:</h1>${user?.balance?.$numberDecimal}
              </li>
              <li className="flex flex-row">
                <h1>Cards:</h1>
                <p>{user?.cardCount}</p>
              </li>
            </ul>
            <Link
              to={`/collection/${user?.userId}`}
              className="underline text-white bg-neutral-700 rounded-xl w-full text-center"
            >
              View
            </Link>
          </container>
          {/* Recent Pulls */}
          <container className="flex flex-col w-1/2 justify-end p-1">
            <ul className="flex flex-row w-full">
              {user.cardCollection?.map((card, index) => (
                <li key={index}>
                  <img
                    src={card.images.small}
                    alt={`Card ${index}`}
                    className="shadow-xl p-1"
                  />
                </li>
              ))}
            </ul>
            <h1 className="bg-neutral-700 rounded-xl text-white text-center ">
              Recent Pulls:
            </h1>
          </container>
        </section>
        </>
      )}
    </>
  );
};

export default RandomCollection;
