import React, { useState } from "react";
import Auth from "../../../utils/auth";
import { bgFabric, iconBurger } from "../../../images/index";
import { useMutation } from "@apollo/client";
import { SELL_CARD } from "../../../utils/mutations";
import { useParams } from "react-router-dom";

const Card = ({ pkmn, index }) => {
  const [sell, { error }] = useMutation(SELL_CARD);
  const { userId } = useParams();
  const me = Auth.getProfile().data;
  const sellData = {
    userId: me.userId,
    cardId: pkmn._id,
    price: parseFloat(pkmn.price.$numberDecimal),
  };
  const handleSell = async () => {
    try {
      await sell({
        variables: sellData,
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <li
      key={index}
      className="m-2 shadow-xl flex flex-wrap animate-fade animate-once animate-ease-in rounded w-1/4 sm:w-1/5 md:w-1/6"
    >
      <div className="w-full flex flex-col">
        <img
          alt={pkmn.name || "Pokémon"}
          src={pkmn.images.small}
          onClick={() => document.getElementById(`card_${index}`).showModal()}
        />
        <dialog id={`card_${index}`} className="modal">
          <div
            className="modal-box bg-transparent h-5/6 w-3/6"
            style={{
              backgroundImage: `url(${pkmn.images.large})`,
              backgroundSize: `contain`,
              backgroundRepeat: `no-repeat`,
              backgroundPosition: `center`,
            }}
            onClick={() => document.getElementById(`card_${index}`).close()}
          ></div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <div
          className="text-black w-full flex flex-row justify-between p-1 mt-2 rounded-xl"
          style={{
            backgroundColor: "#b51f1f",
            backgroundImage: `url(${bgFabric})`,
          }}
        >
          <h1 className="text-white ml-auto mr-auto">
            ${pkmn.price.$numberDecimal}
          </h1>

          <div className="dropdown dropdown-top dropdown-end">
            <img
              src={iconBurger}
              className="size-4 justify-end hover:invert"
              tabIndex={0}
              role="button"
            />
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-fit p-2 shadow text-sm"
            >
              {me.userId === userId && (
                <li className="hover:bg-red-500 hover:text-white rounded-xl">
                  <a onClick={handleSell}>Sell</a>
                </li>
              )}
              <li className="hover:bg-red-500 hover:text-white rounded-xl">
                <a href={pkmn.tcgPlayer} target="_blank" rel="noreferrer">
                  TCGplayer
                </a>
              </li>
              <li className="hover:bg-red-500 hover:text-white rounded-xl">
                <a>Favorite</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-col bg-white rounded-xl mt-2">
          <div className="w-full flex flex-row pb-1">
            <div className="flex flex-col w-full text-black m-auto pl-1 h-16">
              <strong className="pr-6 ml-auto mr-auto">{pkmn.name}</strong>
              <h1 className="text-xs  mt-auto">
                {pkmn.set.name} {pkmn.cardId}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
