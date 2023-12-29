import React from "react";

const Card = ({ pokemon, loading, infoPokemon }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="mx-2 sm:mx-4 lg:mx-8 mr-4 sm:mr-6 lg:mr-8">
      {pokemon.map((poke) => (
        <div
          key={poke.id}
          onClick={() => infoPokemon(poke)}
          className="flex items-center justify-between text-center border-2 border-orange-900 hover:border-orange-950 bg-orange-600 hover:bg-orange-800 rounded-lg cursor-pointer text-sm sm:text-lg lg:text-xl font-poppins text-yellow-200 mb-2 sm:mb-4 px-1.5 sm:px-6 lg:px-8">
          <h1>#{poke.id}</h1>
          <img
            src={poke.sprites?.front_default}
            alt={poke.name}
            className="w-10 sm:w-24 lg:w-36 h-10 sm:h-24 lg:h-36"
          />
          <h1>{poke.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Card;
