import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_USER } from "../../utils/queries";
import { bgFabric } from "../../images/index";
import Card from "./Card/Card";

const Collections = () => {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { userId },
  });
  const [view, setView] = useState({
    favorites: true,
    fullCollection: false,
    wishList: false,
  });
  // If there's no data, show loading or a fallback message
  if (!data) return <h1>Loading...</h1>;
  const {
    username,
    balance,
    cardCollection,
    avatar,
    cardCount,
    collectionWorth,
    favorites,
  } = data.user;

  return (
    <>
      {loading ? (
        <h1>Fetching Collection...</h1>
      ) : error ? (
        <h1>Error: {error.message}</h1>
      ) : (
        <>
          {/* User Information */}
          <div>
            <div className="text-black text-sm flex flex-row rounded w-fit p-4 m-auto w-full">
              <img
                src={avatar}
                className="w-28 h-fit rounded-xl"
                alt={`${username}-icon`}
              />
              <div className="flex flex-col w-full">
                <h1
                  className="shadow-xl text-white p-1 ml-2 rounded-xl w-full"
                  style={{
                    backgroundColor: "#b51f1f",
                    backgroundImage: `url(${bgFabric})`,
                  }}
                >
                  {username}'s Collection
                </h1>
                <ul className="flex flex-col bg-white rounded-xl ml-2 h-full mt-2 p-1 m-auto w-full">
                  <li className="flex flex-row">
                    <strong>Current Balance:</strong>
                    <p className="text-green-700 pl-2">
                      ${balance.$numberDecimal}
                    </p>
                  </li>
                  <li className="flex flex-row">
                    <strong>Total Cards:</strong>
                    <p className="pl-2">{cardCount}</p>
                  </li>
                  <li className="flex flex-row">
                    <strong>Collection Worth:</strong>
                    <p className="text-green-700 pl-2">
                      ${collectionWorth.$numberDecimal}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Card Collection */}
          <div>
            {/* View */}
            <ul className="flex flex-row justify-between w-1/2 md:w-1/3 ml-auto mr-auto">
              <li className="w-1/5 flex justify-center bg-red-500 hover:bg-red-700  text-white rounded-xl">
                <a href="#favorites">Favorites</a>
              </li>
              <li className="w-1/5 flex justify-center bg-red-500 hover:bg-red-700 text-white rounded-xl">
                <a href="#full-collection">Full Collection</a>
              </li>
              <li className="w-1/5 flex justify-center bg-red-500 hover:bg-red-700  text-white rounded-xl">
                <a href="#wishlist">Wish List</a>
              </li>
            </ul>
            {/* Favorites */}
            <ul className="flex flex-wrap justify-center w-full">
              {Array.isArray(favorites) &&
                favorites.map((pkmn, index) => (
                  <Card pkmn={pkmn} index={index} />
                ))}
            </ul>
            {/* Full Collection */}
            <ul className="flex flex-wrap justify-center w-full">
              {Array.isArray(cardCollection) &&
                cardCollection.map((pkmn, index) => (
                  <Card pkmn={pkmn} index={index} />
                ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Collections;
