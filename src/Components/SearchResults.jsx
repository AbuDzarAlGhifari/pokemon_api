import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const { term } = useParams();
  const searchTerm = decodeURIComponent(term);
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
        );
        setPokemon(response.data);
        const speciesResponse = await axios.get(response.data.species.url);
        const evolutionChainResponse = await axios.get(
          speciesResponse.data.evolution_chain.url
        );
        setEvolutionChain(evolutionChainResponse.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  if (!pokemon || !evolutionChain) {
    return (
      <div className="bg-yellow-200 min-h-screen">
        <h1
          className="flex pt-2 mx-3 sm:mx-4 lg:mx-6 text-sm sm:text-lg lg:text-xl font-poppins font-extrabold cursor-pointer justify-end underline italic text-orange-600 hover:text-orange-950"
          onClick={() => navigate(-1)}>
          Back
        </h1>
        <h1 className="text-lg sm:xl lg:2xl font-extrabold font-poppins mx-2 sm:mx-4 lg:mx-6 text-orange-700">
          Search Results for "{searchTerm}"
        </h1>
        <div className="flex items-center justify-center min-h-screen">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  const {
    name,
    height,
    weight,
    types,
    abilities,
    base_experience,
    stats,
    sprites,
    moves,
  } = pokemon;

  const evolutionChainData = extractEvolutionChainData(evolutionChain);

  return (
    <div className="bg-yellow-200 min-h-screen py-4">
      <h1
        className="flex mx-3 sm:mx-4 lg:mx-6 text-sm sm:text-lg lg:text-xl font-poppins font-extrabold cursor-pointer justify-end underline italic text-orange-600 hover:text-orange-950"
        onClick={() => navigate(-1)}>
        Back
      </h1>
      <h1 className="text-lg sm:xl lg:2xl: font-extrabold font-poppins mx-2 sm:mx-4 lg:mx-6 text-orange-700">
        Search Results for "{searchTerm}"
      </h1>
      <div className="mx-2 sm:mx-4 lg:mx-6 rounded-md border-2 border-orange-950 bg-orange-600 bg-opacity-40">
        <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-poppins font-extrabold text-orange-950 mb-3 sm:mb-4 lg:mb-5 bg-orange-500 bg-opacity-60 rounded-t-md py-2 border-b-2 border-orange-950">
          {name}
        </h2>
        <div className="flex items-center justify-center">
          <img
            src={sprites.other.dream_world.front_default}
            alt={name}
            className="w-24 sm:w-40 lg:w-36 h-24 sm:h-36 lg:h-40"
          />
        </div>
        <div className="bg-orange-500 bg-opacity-60 rounded-b-md py-2 border-t-2 border-orange-950 text-xs sm:text-lg lg:text-2xl font-poppins text-orange-950">
          <div className="flex items-center justify-center gap-1">
            {types.map((type) => (
              <div
                key={type.type.name}
                className="bg-orange-900 p-1 px-2 text-orange-200 rounded-lg">
                <p>{type.type.name}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1 pt-1 font-bold">
            <h1>height: {height},</h1>
            <h1>weight: {weight}</h1>
          </div>
          <div className="flex pt-2 items-center justify-center gap-1">
            {abilities.map((ability) => (
              <div
                key={ability.ability.name}
                className="bg-orange-700 p-1 px-2 text-orange-200 rounded-lg">
                <p>{ability.ability.name}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col font-poppins font-bold">
            {stats.map((stat) => (
              <div key={stat.stat.name}>
                <p className="text-left mx-1 sm:mx-8 text-sm sm:text-lg">
                  {stat.stat.name}
                </p>
                <div className="bg-gray-400 h-3 sm:h-5 relative rounded-sm mx-1 sm:mx-8">
                  <div
                    className="bg-orange-700 h-full rounded-sm"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}></div>
                  <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-orange-950">
                    {stat.base_stat} / 255
                  </p>
                </div>
              </div>
            ))}
            <div className="flex flex-col">
              <p className="text-left mx-1 sm:mx-8 text-sm sm:text-lg">
                base_experience
              </p>
              <div className="bg-gray-400 h-3 sm:h-5 relative rounded-sm mx-1 sm:mx-8">
                <div
                  className="bg-orange-700 h-full rounded-sm"
                  style={{ width: `${(base_experience / 555) * 100}%` }}></div>
                <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-orange-950">
                  {base_experience} / 555
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-extrabold font-poppins text-orange-950 mb-2">
              Evolution Chain
            </h2>
            <div className="flex flex-wrap gap-2 justify-center mx-2 sm:mx-3 lg:mx-4">
              {evolutionChainData.map((evolution, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="text-sm sm:text-lg lg:text-xl font-poppins italic font-bold text-orange-900">
                    #{evolution.speciesName}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 justify-center mt-4">
            {Object.entries(sprites).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <p className="text-sm sm:text-lg lg:text-xl font-poppins italic font-bold text-orange-900">
                  {key}
                </p>
                <img
                  src={value}
                  alt={key}
                  className="w-16 sm:w-24 lg:w-36 h-16 sm:h-24 lg:h-36 mb-3"
                />
              </div>
            ))}
          </div>
          <div className="mt-2">
            <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-extrabold font-poppins text-orange-950 mb-2">
              Moves
            </h2>
            <div className="flex flex-wrap gap-2 justify-center mx-2 sm:mx-3 lg:mx-4">
              {moves.map((move, index) => (
                <Link
                  key={index}
                  to={`/moves/${move.move.name}`}
                  className="bg-orange-900 px-2 py-1 text-xs sm:text-lg lg:text-xl text-orange-200 rounded-md">
                  {move.move.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const extractEvolutionChainData = (evolutionChain) => {
  if (!evolutionChain || !evolutionChain.chain) {
    return [];
  }

  const evolutionData = [];
  const addEvolutionData = (chain) => {
    const speciesName = chain.species.name;
    evolutionData.push({ speciesName });

    if (chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((nextEvolution) => {
        addEvolutionData(nextEvolution);
      });
    }
  };

  addEvolutionData(evolutionChain.chain);
  return evolutionData;
};

export default SearchResults;
