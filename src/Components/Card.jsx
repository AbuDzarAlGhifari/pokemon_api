import React, { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import typeColors from './data';

const SkeletonCard = () => (
  <div className="animate-pulse flex items-center justify-center text-center border border-gray-500 bg-blue-gray-50 rounded-lg mb-2 sm:mb-4 px-1.5 sm:px-6 lg:px-8">
    <div>
      <div className="w-10 h-10 bg-gray-300 rounded-md sm:w-24 lg:w-36 sm:h-24 lg:h-36"></div>
      <div className="w-16 h-4 mt-2 bg-gray-300 rounded"></div>
      <div className="flex justify-center mt-1">
        <div className="w-10 h-4 mx-1 bg-gray-300 rounded-lg"></div>
        <div className="w-10 h-4 mx-1 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const Card = ({ pokemon, loading, infoPokemon }) => {
  const [bgColors, setBgColors] = useState({});
  const colorThief = useRef(new ColorThief());

  const handleImageLoad = (img, pokeId) => {
    if (img.complete) {
      const color = colorThief.current.getColor(img);
      setBgColors((prevColors) => ({
        ...prevColors,
        [pokeId]: `rgb(${color[0]}, ${color[1]}, ${color[2]}, 0.8)`,
      }));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {loading
        ? Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : pokemon.map((poke) => (
            <div
              key={poke.id}
              onClick={() => infoPokemon(poke)}
              className="flex items-center justify-center py-2 mb-2 text-sm text-center text-yellow-200 border border-gray-500 rounded-lg cursor-pointer hover:border-orange-950 sm:text-lg lg:text-xl font-poppins "
              style={{ backgroundColor: bgColors[poke.id] || 'gray' }}
            >
              <div>
                <div className="flex items-center justify-center">
                  <img
                    src={poke.sprites?.other['official-artwork']?.front_default}
                    alt={poke.name}
                    className="w-10 h-10 sm:w-24 lg:w-36 sm:h-24 lg:h-36"
                    crossOrigin="anonymous"
                    onLoad={(e) => handleImageLoad(e.target, poke.id)}
                  />
                </div>
                <h1 className="text-xs capitalize sm:text-lg">{poke.name}</h1>
                <div className="flex justify-center mt-1">
                  {poke.types.map((type, index) => (
                    <span
                      key={index}
                      className={`px-2 py-0.5 mx-1 text-white text-[10px] sm:text-sm rounded-lg ${
                        typeColors[type.type.name] || 'bg-gray-400'
                      }`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Card;
