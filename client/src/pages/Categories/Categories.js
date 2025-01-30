import React from "react";
import { useParams } from "react-router-dom";
import { Rarities, Series, SubTypes, SuperTypes, Types } from "./index";

const Categories = () => {
  const params = useParams();

  const loadCategory = () => {
    switch (params.category) {
      case "rarities":
        return <Rarities />;
      case "series":
        return <Series />;
      case "subtypes":
        return <SubTypes />;
      case "supertypes":
        return <SuperTypes />;
      case "types":
        return <Types />;
      default:
        return <h1>An error has occurred!!!</h1>;
    }
  };

  // Always show loading state until data is ready
  return <>{loadCategory()}</>;
};

export default Categories;
