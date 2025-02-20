import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_USER } from "../../utils/queries";
import bgImage from "../../images/background/45-degree-fabric-dark.png";

const Collections = () => {
  const { userId } = useParams();

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { userId },
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
            <div className="text-black text-sm flex flex-row rounded w-fit p-4 mt-8 m-auto w-full">
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
                    backgroundImage: `url(${bgImage})`,
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
          <ul className="flex flex-wrap justify-center">
            {Array.isArray(cardCollection) &&
              cardCollection.map((pkmn, index) => (
                <li
                  key={index}
                  className="m-2 shadow-xl flex flex-wrap animate-fade animate-once animate-ease-in rounded w-48"
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
                    <div
                      className="text-black w-full flex flex-row justify-between p-1 mt-2 rounded-xl"
                      style={{
                        backgroundColor: "#b51f1f",
                        backgroundImage: `url(${bgImage})`,
                      }}
                    >
                      <h1 className="text-white ml-auto mr-auto">
                        ${pkmn.price.$numberDecimal}
                      </h1>
                    </div>
                    <div className="w-full flex flex-col bg-white rounded-xl mt-2">
                      <div className="w-full flex flex-row pb-1">
                        <a
                          href={pkmn.tcgPlayer}
                          target="_blank"
                          rel="noreferrer"
                          className="flex flex-col w-full text-black m-auto pl-1 h-16"
                        >
                          <strong className="pr-6 ml-auto mr-auto">
                            {pkmn.name}
                          </strong>
                          <h1 className="text-xs  mt-auto">{pkmn.set.name}</h1>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Collections;
