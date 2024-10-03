import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);
        const speciesResponse = await axios.get(response.data.species.url);
        const evolutionChainResponse = await axios.get(
          speciesResponse.data.evolution_chain.url
        );
        setEvolutionChain(evolutionChainResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!pokemon || !evolutionChain) {
    return (
      <div className="min-h-screen bg-yellow-200">
        <h1
          className="flex justify-end pt-2 mx-3 text-sm italic font-extrabold text-orange-600 underline cursor-pointer sm:mx-4 lg:mx-6 sm:text-lg lg:text-xl font-poppins hover:text-orange-950"
          onClick={() => navigate(-1)}
        >
          Back
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
    <div className="min-h-screen py-4 bg-yellow-200">
      <h1
        className="flex justify-end mx-3 text-sm italic font-extrabold text-orange-600 underline cursor-pointer sm:mx-4 lg:mx-6 sm:text-lg lg:text-xl font-poppins hover:text-orange-950"
        onClick={() => navigate(-1)}
      >
        Back
      </h1>
      <div className="mx-2 mt-2 bg-orange-600 border-2 rounded-md sm:mx-4 lg:mx-6 border-orange-950 bg-opacity-40">
        <h2 className="py-2 mb-3 text-lg font-extrabold text-center bg-orange-500 border-b-2 sm:text-xl lg:text-2xl font-poppins text-orange-950 sm:mb-4 lg:mb-5 bg-opacity-60 rounded-t-md border-orange-950">
          {name}
        </h2>
        <div className="flex items-center justify-center">
          <img
            src={sprites?.other['official-artwork']?.front_default}
            alt={sprites?.front_default}
            className="w-24 h-24 sm:w-40 lg:w-36 sm:h-36 lg:h-40"
          />
        </div>
        <div className="py-2 text-xs bg-orange-500 border-t-2 bg-opacity-60 rounded-b-md border-orange-950 sm:text-lg lg:text-2xl font-poppins text-orange-950">
          <div className="flex items-center justify-center gap-1">
            {types.map((type) => (
              <div
                key={type.type.name}
                className="p-1 px-2 text-orange-200 bg-orange-900 rounded-lg"
              >
                <p>{type.type.name}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1 pt-1 font-bold">
            <h1>height: {height},</h1>
            <h1>weight: {weight}</h1>
          </div>
          <div className="flex items-center justify-center gap-1 pt-2">
            {abilities.map((ability) => (
              <div
                key={ability.ability.name}
                className="p-1 px-2 text-orange-200 bg-orange-700 rounded-lg"
              >
                <p>{ability.ability.name}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col font-bold font-poppins">
            {stats.map((stat) => (
              <div key={stat.stat.name}>
                <p className="mx-1 text-sm text-left sm:mx-8 sm:text-lg">
                  {stat.stat.name}
                </p>
                <div className="relative h-3 mx-1 bg-gray-400 rounded-sm sm:h-5 sm:mx-8">
                  <div
                    className="h-full bg-orange-700 rounded-sm"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>
                  <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-orange-950">
                    {stat.base_stat} / 255
                  </p>
                </div>
              </div>
            ))}
            <div className="flex flex-col">
              <p className="mx-1 text-sm text-left sm:mx-8 sm:text-lg">
                base_experience
              </p>
              <div className="relative h-3 mx-1 bg-gray-400 rounded-sm sm:h-5 sm:mx-8">
                <div
                  className="h-full bg-orange-700 rounded-sm"
                  style={{ width: `${(base_experience / 555) * 100}%` }}
                ></div>
                <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-orange-950">
                  {base_experience} /555
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="mb-2 text-lg font-extrabold text-center sm:text-xl lg:text-2xl font-poppins text-orange-950">
              Evolution Chain
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mx-2 sm:mx-3 lg:mx-4">
              {evolutionChainData.map((evolution, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="text-sm italic font-bold text-orange-900 sm:text-lg lg:text-xl font-poppins">
                    #{evolution.speciesName}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid justify-center grid-cols-2 mt-4">
            {Object.entries(sprites).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <p className="text-sm italic font-bold text-orange-900 sm:text-lg lg:text-xl font-poppins">
                  {key}
                </p>
                <img
                  src={value}
                  alt={key}
                  className="w-16 h-16 mb-3 sm:w-24 lg:w-36 sm:h-24 lg:h-36"
                />
              </div>
            ))}
          </div>
          <div className="mt-2">
            <h2 className="mb-2 text-lg font-extrabold text-center sm:text-xl lg:text-2xl font-poppins text-orange-950">
              Moves
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mx-2 sm:mx-3 lg:mx-4">
              {moves.map((move, index) => (
                <Link
                  key={index}
                  to={`/moves/${move.move.name}`}
                  className="px-2 py-1 text-xs text-orange-200 bg-orange-900 rounded-md sm:text-lg lg:text-xl"
                >
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

export default PokemonDetail;
