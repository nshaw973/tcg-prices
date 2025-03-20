import React from "react";
import { sets } from "../../utils/lists";
import { useNavigate } from "react-router-dom";

const Sets = () => {
  const navigate = useNavigate();

  const handleSet = (id) => {
    navigate(`/categories/series?set=${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {sets.map((set) => (
        <div key={set.id} className="h-18 mt-auto mb-auto">
          <img
            src={`https://images.pokemontcg.io/${set.id}/logo.png`}
            alt={set.name}
            className="w-32 p-2 cursor-pointer hover:opacity-80 hover:scale-105 transition-all"
            onClick={() => handleSet(set.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Sets;