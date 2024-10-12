import React, { useState } from 'react';
import {
  getColorFromImage,
  darkenColor,
} from '../../services/colorThiefService';
import { typeColors } from '../../services/data';

const CardPokemon = ({ pokemon, infoPokemon }) => {
  const [bgColors, setBgColors] = useState({});

  const handleImageLoad = async (img, pokeId) => {
    try {
      const color = await getColorFromImage(img);
      setBgColors((prevColors) => ({
        ...prevColors,
        [pokeId]: color,
      }));
    } catch (error) {
      console.error('Error extracting color:', error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
      {pokemon.map((poke) => (
        <div
          key={poke.id}
          onClick={() => infoPokemon(poke)}
          className="flex items-center justify-center py-2 mb-2 text-center border border-gray-500 rounded-md cursor-pointer hover:border-orange-950 sm:text-lg lg:text-xl font-poppins"
          style={{ backgroundColor: bgColors[poke.id] || 'gray' }}
        >
          <div>
            <div className="flex items-center justify-center">
              <img
                src={
                  poke.sprites?.other['official-artwork']?.front_default ||
                  poke.sprites?.front_default
                }
                alt={poke.name}
                className="w-10 h-10 sm:w-24 lg:w-36 sm:h-24 lg:h-36"
                crossOrigin="anonymous"
                onLoad={(e) => handleImageLoad(e.target, poke.id)}
              />
            </div>
            <h1
              className="text-xs font-extrabold capitalize sm:text-lg"
              style={{ color: darkenColor(bgColors[poke.id]) }}
            >
              {poke.name}
            </h1>
            <div className="flex justify-center mt-1">
              {poke.types.map((type, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 mx-1 font-poppins font-medium text-[10px] sm:text-sm rounded-lg ${
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

export default CardPokemon;
