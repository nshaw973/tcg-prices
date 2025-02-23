import React, { useState, useEffect } from "react";
import PriceLists from "./PriceLists";

const SearchAll = ({ props }) => {
  const [cardFlip, setCardFlip] = useState(false);
  const { item, index } = props;

  useEffect(() => {
    if (cardFlip) {
      setTimeout(() => {
        setCardFlip(false);
      }, 1000);
    }
  }, [cardFlip]);

  return (
    <>
      <li
        key={index}
        className="w-full sm:w-[450px] h-fit shadow-xl mt-2 mb-2 md:m-4 flex flex-wrap animate-fade animate-once animate-ease-in  rounded-xl"
      >
        <div className="w-full flex flex-row">
          {/* Image */}

          <img
            alt={item.name}
            src={item.images.small}
            onClick={() => document.getElementById(`card_${index}`).showModal()}
            className={`${
              cardFlip && "animate-rotate-y animate-once animate-ease-in-out"
            } h-48 md:min-h-48 ml-auto mr-auto shadow-xl`}
          ></img>
          <dialog id={`card_${index}`} className="modal">
            <div className="modal-box bg-transparent">
              <img
                alt={item.name}
                src={item.images.large}
                className="w-fit h-fit  animate-fade-up animate-ease-out"
              />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {/* Market Data */}
          <div className="w-full flex flex-col bg-white rounded-xl ml-1">
            <div className="w-full flex flex-row border-b-2 pb-1 border-neutral-300">
              <div className="flex flex-col w-full text-black m-auto pl-1">
                <strong className="pr-6">
                  {item.name} / {item.id}
                </strong>
                <h1 className="text-xs">{item.set.name}</h1>
              </div>
              {/* Add */}
              <button
                className="btn btn-sm rounded-none text-white ml-2 hover:invert rounded-lg"
                onClick={() => setCardFlip(true)}
              >
                +
              </button>
            </div>
            {/* Data */}
            <div className="text-black pl-1 p-1 w-full h-full">
              {item.tcgplayer ? (
                <div className="pl-0.1 h-full w-full flex flex-col ">
                  <ul className="flex flex-row">
                    {Object.entries(item.tcgplayer.prices).map(
                      ([key, rarity]) => {
                        return <PriceLists props={{ key, rarity }} />;
                      }
                    )}
                  </ul>
                  {/* Link */}

                </div>
              ) : (
                <div className="pl-0.1 h-full w-full flex flex-col ">
                  <h1>
                    Card Data not found, please visit TCGPlayer for more
                    information!
                  </h1>
                </div>
              )}
            </div>
            <div className="flex flex-row-reverse mt-auto w-full justify-between">
            <a
                    className="flex mt-auto justify-end underline text-black"
                    href={item.tcgplayer.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on TCGPlayer
                  </a>
              {cardFlip && (
                <h1 className="bg-green-600 text-white rounded m-auto w-fit w-auto pl-4 pr-4">
                  Card Added!
                </h1>
              )}
            </div>
          </div>
        </div>
        {/* Actions */}
      </li>
    </>
  );
};

export default SearchAll;
