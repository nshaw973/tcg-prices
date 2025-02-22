import React, { useEffect, useState } from "react";
import Auth from "../../../utils/auth";
import { bgFabric, iconBurger } from "../../../images/index";
import { useMutation } from "@apollo/client";
import {
  FAVORITE_CARD,
  SELL_CARD,
  UNFAVORITE_CARD,
} from "../../../utils/mutations";
import { useParams } from "react-router-dom";

const Card = ({ pkmn, index, isFavorite }) => {
  const [sell] = useMutation(SELL_CARD);
  const [favorite] = useMutation(FAVORITE_CARD);
  const [unFavorite] = useMutation(UNFAVORITE_CARD);
  const [cardFlip, playCardFlip] = useState(false);
  const { userId } = useParams();
  const [loginData, setLoginData] = useState(null);

  const handleSell = async () => {
    try {
      await sell({
        variables: {
          userId: loginData?.userId,
          cardId: pkmn._id,
          price: parseFloat(pkmn.price.$numberDecimal),
        },
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFavorite = async () => {
    try {
      await favorite({
        variables: {
          _id: pkmn._id,
        },
      });
      playCardFlip(true);
      console.log(`${pkmn.name} has been added to favorites!`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUnfavorite = async () => {
    try {
      await unFavorite({
        variables: {
          _id: pkmn._id,
        },
      });
      playCardFlip(true);
      console.log(`${pkmn.name} has been removed from favorites!`);
    } catch (error) {
      console.log(error);
    }
  };

  // gives more options in the dropdown menu if the user is viewing their own collection
  useEffect(() => {
    if (Auth.loggedIn()) {
      const me = Auth.getProfile().data;
      setLoginData(me);
    }
  }, [userId]);

  return (
    <li
      key={index}
      className="m-2 shadow-xl flex flex-wrap animate-fade animate-once animate-ease-in rounded w-1/4 sm:w-1/5 md:max-w-36 "
    >
      <div className="w-full flex flex-col">
        <img
          alt={pkmn.name || "Pokémon"}
          src={pkmn.images.small}
          onClick={() => document.getElementById(`card_${index}`).showModal()}
          className={`${cardFlip && "animate-rotate-y animate-ease-linear"}`}
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
              alt="icon"
              src={iconBurger}
              className="size-4 justify-end hover:invert"
              tabIndex={0}
              role="button"
            />
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-box z-[1] w-fit p-2 shadow text-sm"
            >
              {loginData?.userId === userId && (
                <>
                  {/* Sell */}
                  <li className="hover:bg-red-500 hover:text-white rounded-xl">
                    <button onClick={handleSell}>Sell</button>
                  </li>
                  {/* Favorites */}
                  <li className="hover:bg-red-500 hover:text-white rounded-xl">
                    {isFavorite ? (
                      <button onClick={async () => handleUnfavorite()}>
                        Unfavorite
                      </button>
                    ) : (
                      <button onClick={async () => handleFavorite()}>
                        Favorite
                      </button>
                    )}
                  </li>
                </>
              )}
              {/* TCGPlayer */}
              <li className="hover:bg-red-500 hover:text-white rounded-xl">
                <button href={pkmn.tcgPlayer} target="_blank" rel="noreferrer">
                  TCGplayer
                </button>
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
