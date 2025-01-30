import React from "react";
import { upperCase } from "../../utils/utils";

const PriceLists = ({ props }) => {
  const { rarity } = props;

  // If rarity is empty or undefined, return null
  if (!rarity || Object.keys(rarity).length === 0) {
    return null;
  }

  return (
    <li className="flex flex-col w-fit p-2 pt-0">
      <strong className="underline">{upperCase(props.key)}: </strong>
      {Object.entries(rarity).map(([priceType, price], index) => {
        // Skip rendering if price is falsy or priceType is "directLow"
        if (!price || priceType === "directLow") {
          return null;
        }

        return (
          <div key={index} className="flex flex-row">
            <h1
              className={`${
                priceType === "market" ? "font-bold" : ""
              } text-black pr-2`}
            >
              {`${upperCase(priceType)}: `}
            </h1>
            <h1
              className={`${
                priceType === "market" ? "text-green-600 font-bold" : ""
              }`}
            >
              {`$${price}`}
            </h1>
          </div>
        );
      })}
    </li>
  );
};

export default PriceLists;