import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetails } from '../services/api';
import { Spinner } from '@material-tailwind/react';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const extractEvolutionChainData = (evolutionChain) => {
    if (!evolutionChain || !evolutionChain.chain) {
      return [];
    }

    const evolutionData = [];
    let currentEvolution = evolutionChain.chain;

    while (currentEvolution) {
      evolutionData.push({
        speciesId: currentEvolution.species.url.split('/').slice(-2)[0],
        speciesName: currentEvolution.species.name,
      });

      currentEvolution = currentEvolution.evolves_to[0];
    }

    return evolutionData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { pokemon, evolutionChain } = await getPokemonDetails(id);
        setPokemon(pokemon);
        setEvolutionChain(evolutionChain);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="w-16 h-16 text-gray-900/50" />
      </div>
    );
  }

  if (!pokemon || !evolutionChain) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <h1>Error loading Pokémon details.</h1>
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
  } = pokemon;

  const evolutionChainData = extractEvolutionChainData(evolutionChain);

  return (
    <div className="min-h-screen py-4 bg-gray-200">
      <h1
        className="flex justify-end mx-3 text-sm italic font-extrabold text-gray-600 underline cursor-pointer sm:mx-4 lg:mx-6 sm:text-lg lg:text-xl font-poppins hover:text-gray-900"
        onClick={() => navigate(-1)}
      >
        Back
      </h1>
      <div className="mx-2 mt-2 bg-gray-600 border-2 border-gray-900 rounded-md sm:mx-4 lg:mx-6 bg-opacity-40">
        <h2 className="py-2 mb-3 text-lg font-extrabold text-center text-gray-900 bg-gray-500 border-b-2 border-gray-900 sm:text-xl lg:text-2xl font-poppins sm:mb-4 lg:mb-5 bg-opacity-60 rounded-t-md">
          {name}
        </h2>
        <div className="flex items-center justify-center">
          <img
            src={sprites?.other['official-artwork']?.front_default}
            alt={name}
          />
        </div>
        <div className="py-2 text-xs text-gray-900 bg-gray-500 border-t-2 border-gray-900 bg-opacity-60 rounded-b-md sm:text-lg lg:text-2xl font-poppins">
          <div className="flex items-center justify-center gap-1">
            {types.map((type) => (
              <div
                key={type.type.name}
                className="p-1 px-2 text-gray-200 bg-gray-900 rounded-lg"
              >
                <p>{type.type.name}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1 pt-1 font-bold">
            <h1>Height: {height},</h1>
            <h1>Weight: {weight}</h1>
          </div>
          <div className="flex items-center justify-center gap-1 pt-2">
            {abilities.map((ability) => (
              <div
                key={ability.ability.name}
                className="p-1 px-2 text-gray-200 bg-gray-700 rounded-lg"
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
                    className="h-full bg-gray-700 rounded-sm"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>
                  <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-gray-900">
                    {stat.base_stat} / 255
                  </p>
                </div>
              </div>
            ))}
            <div className="flex flex-col">
              <p className="mx-1 text-sm text-left sm:mx-8 sm:text-lg">
                Base Experience
              </p>
              <div className="relative h-3 mx-1 bg-gray-400 rounded-sm sm:h-5 sm:mx-8">
                <div
                  className="h-full bg-gray-700 rounded-sm"
                  style={{ width: `${(base_experience / 555) * 100}%` }}
                ></div>
                <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-gray-900">
                  {base_experience} / 555
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="mb-2 text-lg font-extrabold text-center text-gray-900 sm:text-xl lg:text-2xl font-poppins">
              Evolution Chain
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mx-2 sm:mx-3 lg:mx-4">
              {evolutionChainData.map((evolution, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="text-sm italic font-bold text-gray-900 sm:text-lg lg:text-xl font-poppins">
                    #{evolution.speciesName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
