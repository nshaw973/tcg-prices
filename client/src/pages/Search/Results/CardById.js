import React from "react";

const CardById = ({ data }) => {
  const { name, id, images, set } = data;
  console.log(data)
  return (
    <div className="text-black w-full h-full flex flex-row p-8">
      {/* Image */}
      <div className="animate-fade animate-ease-in-out">
        <img src={images.large} alt={`${name}-${id}`} />
      </div>
      {/* Data */}
      <div className="w-full animate-fade-left animate-once animate-ease-in-out">
        {/* Name */}
        <div className="flex flex-col border-b-2 border-neutral-800 h-fit">
          <strong>{name} {id}</strong>
          <h1>{set.name}</h1>
        </div>
      </div>
      {/* Extra */}
      <div></div>
      {/* End */}
    </div>
  );
};

export default CardById;
