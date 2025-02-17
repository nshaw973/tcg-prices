import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_USER } from "../../utils/queries";

const Collections = () => {
  const { userId } = useParams();

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { userId },
  });

  // If there's no data, show loading or a fallback message
  if (!data) return <h1>Loading...</h1>;

  const { cardCollection } = data.user;

  return (
    <>
      {loading ? (
        <h1>Fetching Collection...</h1>
      ) : error ? (
        <h1>Error: {error.message}</h1>
      ) : (
        <ul className="flex flex-wrap justify-center">
          {Array.isArray(cardCollection) &&
            cardCollection.map((pkmn, index) => (
              <li
                key={index}
                className="border-2 m-8 shadow-xl flex flex-wrap animate-fade animate-once animate-ease-in"
              >
                <div className="w-full flex flex-col">
                  <img
                    alt={pkmn.name || "Pokémon"}
                    src={pkmn.images.small}
                    onClick={() =>
                      document.getElementById(`card_${index}`).showModal()
                    }
                  />
                  <dialog id={`card_${index}`} className="modal">
                    <div className="modal-box bg-transparent">
                      <img
                        alt={pkmn.name || "Pokémon"}
                        src={pkmn.images.large}
                        className="w-fit h-fit animate-fade-up animate-ease-out"
                      />
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                  <div className="w-full flex flex-col">
                    <div className="w-full flex flex-row border-b-2 pb-1 border-neutral-300">
                      <div className="flex flex-col w-full text-black m-auto pl-1">
                        <strong className="pr-6">
                          {pkmn.name}
                        </strong>
                        <h1 className="text-xs">{pkmn.set.name}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default Collections;
