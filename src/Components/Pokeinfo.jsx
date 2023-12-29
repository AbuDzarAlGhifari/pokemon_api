import React from "react";
import { Link } from "react-router-dom";

const Pokeinfo = ({ data }) => {
  if (!data) {
    return (
      <div className="text-sm sm:text-lg lg:text-xl font-poppins font-bold text-orange-950">
        Select a Pokemon for more info !!!
      </div>
    );
  }

  const { name, id, height, weight, types, stats } = data;

  return (
    <div className="mx-2 sm:mx-4 lg:mx-6 rounded-md border-2 border-orange-950 bg-orange-600 bg-opacity-40">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-poppins font-extrabold text-orange-950 mb-3 sm:mb-4 lg:mb-5 bg-orange-500 bg-opacity-60 rounded-t-md py-2 border-b-2 border-orange-950">
        {name}
      </h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={name}
        className="w-24 sm:w-40 lg:w-36 h-24 sm:h-36 lg:h-40 "
      />
      <div className="bg-orange-500 bg-opacity-60 rounded-b-md py-2 border-t-2 border-orange-950 text-xs sm:text-lg lg:text-2xl font-poppins text-orange-950">
        <div className="flex items-center justify-center gap-1">
          {types.map((type) => (
            <div
              key={type.type.name}
              className="bg-orange-900 p-1 px-2 text-orange-200 rounded-lg"
            >
              <p>{type.type.name}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1 pt-1 font-bold">
          <h1>height: {height},</h1>
          <h1>weight: {weight}</h1>
        </div>
        <div className="flex flex-col font-poppins font-bold">
          {stats.map((stat) => (
            <div key={stat.stat.name}>
              <p className="text-left mx-1 sm:mx-8 text-sm sm:text-lg">{stat.stat.name}</p>
              <div className="bg-gray-400 h-3 sm:h-5 relative rounded-sm mx-1 sm:mx-8">
                <div
                  className="bg-orange-700 h-full rounded-sm"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                ></div>
                <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-orange-950">
                  {stat.base_stat} / 255
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to={`/pokemon/${name}`}
          className="bg-orange-700 hover:bg-orange-900 border-2 border-orange-800 hover:border-orange-950 text-orange-200 font-poppins font-semibold transition-all px-2 py-1 rounded-md mt-4 inline-block"
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Pokeinfo;
