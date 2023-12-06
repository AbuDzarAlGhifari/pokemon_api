import React from "react";
const Card = ({ pokemon, loading, infoPokemon }) => {
  console.log(pokemon);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <div
              className="cursor-pointer bg-cyan-500 font-semibold rounded-lg text-xs sm:text-sm lg:text-lg hover:text-white hover:bg-blue-500 p-1 hover:p-0.5 transition-all"
              key={item.id}
              onClick={() => infoPokemon(item)}>
              <img
                className="rounded-t-lg w-full "
                src={item.sprites.front_default}
                alt="poke"
              />
              <h6 className="font-bold pb-1 hover:pb-0 cursor-pointer text-center">
                {item.name}
              </h6>
            </div>
          );
        })
      )}
    </>
  );
};
export default Card;
