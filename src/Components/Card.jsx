import React, { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import typeColors from '../services/data';

const darkenColor = (color) => {
  const [r, g, b] = color;
  return `rgb(${Math.max(r - 50, 0)}, ${Math.max(g - 50, 0)}, ${Math.max(
    b - 50,
    0
  )})`;
};

const Card = ({ pokemon, infoPokemon }) => {
  const [bgColors, setBgColors] = useState({});
  const colorThief = useRef(new ColorThief());

  const handleImageLoad = (img, pokeId) => {
    if (img.complete) {
      const color = colorThief.current.getColor(img);
      setBgColors((prevColors) => ({
        ...prevColors,
        [pokeId]: `rgb(${color[0]}, ${color[1]}, ${color[2]}, 0.9)`,
      }));
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
              style={{
                color: darkenColor(
                  bgColors[poke.id]
                    ? bgColors[poke.id].match(/\d+/g).map(Number)
                    : [128, 128, 128]
                ),
              }}
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

export default Card;
