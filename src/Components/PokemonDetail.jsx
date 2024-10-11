import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetails } from '../services/api';
import { Spinner } from '@material-tailwind/react';
import { typeColors } from '../services/data';
import ColorThief from 'colorthief';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GiBorderedShield } from 'react-icons/gi';
import { FaHeart, FaLongArrowAltRight, FaShieldAlt } from 'react-icons/fa';
import { RiSwordFill } from 'react-icons/ri';
import { SiCodemagic } from 'react-icons/si';
import { IoTimer } from 'react-icons/io5';
import { MdCatchingPokemon } from 'react-icons/md';
import axios from 'axios';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [generation, setGeneration] = useState('');
  const [alternateForms, setAlternateForms] = useState([]);
  const [habitat, setHabitat] = useState('');
  const [loading, setLoading] = useState(true);
  const [bgColors, setBgColors] = useState({});
  const colorThief = useRef(new ColorThief());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabitat = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        // Fetch habitat from species endpoint
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        setHabitat(
          speciesData.habitat ? speciesData.habitat.name : 'Unknown Habitat'
        );
      } catch (error) {
        console.error('Error fetching habitat:', error);
        setHabitat('Error fetching habitat');
      } finally {
        setLoading(false);
      }
    };

    fetchHabitat();
  }, [id]);

  const handleImageLoad = (img, pokeId) => {
    try {
      if (img.complete && img.naturalHeight !== 0) {
        const color = colorThief.current.getColor(img);
        setBgColors((prevColors) => ({
          ...prevColors,
          [pokeId]: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.9)`,
        }));
      }
    } catch (error) {
      console.error('Error extracting color:', error);
    }
  };

  const darkenColor = (color) => {
    if (!color) return 'rgb(128, 128, 128)';
    const rgb = color.match(/\d+/g).map(Number);
    const [r, g, b] = rgb;
    return `rgb(${Math.max(r - 50, 0)}, ${Math.max(g - 50, 0)}, ${Math.max(
      b - 50,
      0
    )})`;
  };

  const getStatColor = (stat) => {
    if (stat <= 50) return 'to-red-500';
    if (stat <= 100) return 'to-green-500';
    return 'to-blue-500';
  };

  const getStatIcon = (statName) => {
    switch (statName) {
      case 'hp':
        return <FaHeart className="inline-block mr-1" />;
      case 'attack':
        return <RiSwordFill className="inline-block mr-1" />;
      case 'defense':
        return <FaShieldAlt className="inline-block mr-1" />;
      case 'special-attack':
        return <SiCodemagic className="inline-block mr-1" />;
      case 'special-defense':
        return <GiBorderedShield className="inline-block mr-1" />;
      case 'speed':
        return <IoTimer className="inline-block mr-1" />;
      case 'base-experience':
        return <MdCatchingPokemon className="inline-block mr-1" />;
      default:
        return null;
    }
  };

  const extractEvolutionChainData = (evolutionChain) => {
    if (!evolutionChain || !evolutionChain.chain) {
      return [];
    }

    const evolutionData = [];
    let currentEvolution = evolutionChain.chain;

    while (currentEvolution) {
      const speciesId = currentEvolution.species.url.split('/').slice(-2)[0];
      const speciesName = currentEvolution.species.name;

      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`;

      evolutionData.push({
        speciesId,
        speciesName,
        imageUrl,
      });

      currentEvolution = currentEvolution.evolves_to[0];
    }

    return evolutionData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { pokemon, evolutionChain, generation, forms } =
          await getPokemonDetails(id);
        setPokemon(pokemon);
        setEvolutionChain(evolutionChain);
        setGeneration(generation);

        // Fetch details for alternate forms (like Mega or Gigantamax)
        const formPromises = forms.map(async (form) => {
          if (form.is_default) return null; // Skip default form
          const formResponse = await axios.get(form.pokemon.url);
          return {
            name: form.pokemon.name,
            imageUrl:
              formResponse.data.sprites.other['official-artwork'].front_default,
          };
        });

        const resolvedForms = await Promise.all(formPromises);
        setAlternateForms(resolvedForms.filter(Boolean)); // Remove null values (default forms)
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
      <div className="min-h-screen py-4 bg-gray-200">
        <div
          className="flex justify-end mx-3 text-sm italic font-extrabold text-gray-600 underline cursor-pointer sm:mx-4 lg:mx-6 sm:text-lg lg:text-xl font-poppins hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <IoMdArrowRoundBack className="w-5 h-5 sm:w-10 sm:h-10" />
        </div>
        <div className="flex items-center justify-center text-xl font-extrabold h-36 font-poppins">
          <h1>No Pokémon details ....</h1>
        </div>
      </div>
    );
  }

  const {
    id: pokemonId,
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
    <div className="py-4 mx-auto max-w-7xl">
      <h1
        className="flex justify-end mx-3 text-sm italic font-extrabold text-gray-600 underline cursor-pointer sm:mx-4 lg:mx-6 sm:text-lg lg:text-xl font-poppins hover:text-gray-900"
        onClick={() => navigate(-1)}
      >
        <IoMdArrowRoundBack className="w-5 h-5 sm:w-10 sm:h-10" />
      </h1>

      <div
        className="grid grid-cols-12 p-4 mx-2 mt-2 rounded-md sm:mx-4 lg:mx-6 bg-opacity-40"
        style={{ backgroundColor: bgColors[pokemonId] || 'gray' }}
      >
        <div className="sm:col-span-6 col-span-full">
          <div className="flex items-center justify-center">
            <img
              src={sprites?.other['official-artwork']?.front_default}
              alt={name}
              crossOrigin="anonymous"
              onLoad={(e) => handleImageLoad(e.target, id)}
            />
          </div>
        </div>

        <div className="px-1 py-2 text-sm rounded-md sm:col-span-6 col-span-full sm:py-4 bg-opacity-40 bg-gray-50 sm:text-xl font-poppins">
          <h2
            className="py-2 font-extrabold text-center capitalize font-poppins"
            style={{ color: darkenColor(bgColors[pokemonId]) }}
          >
            {name}
          </h2>

          <div className="flex items-center justify-center gap-1 my-1">
            {types.map((type) => (
              <span
                key={type.type.name}
                className={`px-2 py-1 mx-1 font-poppins font-medium rounded-lg text-sm sm:text-lg ${
                  typeColors[type.type.name] || 'bg-gray-400'
                }`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1 pt-2 my-1">
            {abilities.map((ability) => (
              <div
                key={ability.ability.name}
                className="px-2 py-1 mx-1 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg sm:text-lg"
              >
                <p>{ability.ability.name}</p>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-center gap-2 pb-3 font-bold"
            style={{ color: darkenColor(bgColors[pokemonId]) }}
          >
            <h1 className="text-sm sm:text-lg">Height: {height}</h1>
            <span className="mx-2">|</span>
            <h1 className="text-sm sm:text-lg">Weight: {weight}</h1>
          </div>

          <div className="text-center">
            <h3
              className="py-2 font-extrabold text-center capitalize font-poppins"
              style={{ color: darkenColor(bgColors[pokemonId]) }}
            >
              Generation: {generation}
            </h3>
          </div>

          <div className="flex flex-col font-bold font-poppins">
            {base_experience !== undefined && (
              <>
                <p
                  className="mx-1 text-sm capitalize sm:mx-8 sm:text-lg"
                  style={{ color: darkenColor(bgColors[pokemonId]) }}
                >
                  {getStatIcon('base-experience')} Base Experience
                </p>
                <div className="relative h-3.5 mx-1 overflow-hidden bg-gray-400 rounded-sm sm:h-5 sm:mx-8">
                  <div
                    className={`h-full rounded-sm bg-gradient-to-r from-gray-500 ${getStatColor(
                      base_experience
                    )}`}
                    style={{ width: `${(base_experience / 555) * 100}%` }}
                  ></div>
                  <p
                    className="absolute top-0 right-0 mr-1 text-xs sm:text-sm"
                    style={{ color: darkenColor(bgColors[pokemonId]) }}
                  >
                    {base_experience} / 555
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col font-bold font-poppins">
            {stats.map((stat) => (
              <div key={stat.stat.name} className="my-0.5">
                <p
                  className="mx-1 text-sm capitalize sm:mx-8 sm:text-lg"
                  style={{ color: darkenColor(bgColors[pokemonId]) }}
                >
                  {getStatIcon(stat.stat.name)} {stat.stat.name}
                </p>
                <div className="relative h-3.5 mx-1 overflow-hidden bg-gray-400 rounded-sm sm:h-5 sm:mx-8">
                  <div
                    className={`h-full rounded-sm bg-gradient-to-r from-gray-500  ${getStatColor(
                      stat.base_stat
                    )}`}
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>
                  <p
                    className="absolute top-0 right-0 mr-1 text-xs sm:text-sm"
                    style={{ color: darkenColor(bgColors[pokemonId]) }}
                  >
                    {stat.base_stat} / 255
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-4 mt-3 text-xs rounded-md col-span-full bg-opacity-40 bg-gray-50 sm:text-lg font-poppins">
          <div className="items-center justify-center gap-6 sm:flex">
            <div>
              <h1
                className="py-2 mt-4 text-2xl font-extrabold text-center font-poppins"
                style={{ color: darkenColor(bgColors[pokemonId]) }}
              >
                Evolution Chain
              </h1>
              <div className="flex flex-wrap justify-center gap-2 mx-2 sm:mx-3 lg:mx-4">
                {evolutionChainData.map((evolution, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <img
                        src={evolution.imageUrl}
                        alt={evolution.speciesName}
                        className="object-contain w-16 h-16 sm:w-28 sm:h-28"
                      />
                      <p
                        className="text-sm italic font-bold sm:text-lg lg:text-xl font-poppins"
                        style={{ color: darkenColor(bgColors[pokemonId]) }}
                      >
                        {evolution.speciesName}
                      </p>
                    </div>
                    {index < evolutionChainData.length - 1 && (
                      <FaLongArrowAltRight
                        className="mx-2 text-2xl sm:text-3xl"
                        style={{ color: darkenColor(bgColors[pokemonId]) }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {alternateForms.length > 0 && (
              <div>
                <h1
                  className="py-2 mt-4 text-2xl font-extrabold text-center font-poppins"
                  style={{ color: darkenColor(bgColors[pokemonId]) }}
                >
                  Alternate Forms
                </h1>
                <div className="flex flex-wrap justify-center gap-2 mx-2 sm:mx-3 lg:mx-4">
                  {alternateForms.map((form, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center"
                    >
                      <img
                        src={form.imageUrl}
                        alt={`${name} alternate form`}
                        className="object-contain w-16 h-16 sm:w-28 sm:h-28"
                      />
                      <h1
                        className="text-sm italic font-semibold text-center text-gray-900 sm:text-lg lg:text-xl font-poppins"
                        style={{ color: darkenColor(bgColors[pokemonId]) }}
                      >
                        {form.name}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <h1
            className="py-2 mt-4 text-2xl font-extrabold text-center font-poppins"
            style={{ color: darkenColor(bgColors[pokemonId]) }}
          >
            Other Image
          </h1>
          <div className="flex flex-wrap justify-center w-full gap-3 sm:gap-7">
            {sprites?.front_default && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={sprites.front_default}
                  alt={`${name} front default`}
                  className="object-contain w-16 h-16 sm:w-28 sm:h-28"
                />
                <h1
                  className="text-sm italic font-semibold text-center text-gray-900 sm:text-lg lg:text-xl font-poppins"
                  style={{ color: darkenColor(bgColors[pokemonId]) }}
                >
                  default
                </h1>
              </div>
            )}

            {sprites?.other.dream_world.front_default && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={sprites.other.dream_world.front_default}
                  alt={`${name} dream world`}
                  className="object-contain w-16 h-16 sm:w-28 sm:h-28"
                />
                <h1
                  className="text-sm italic font-semibold text-center text-gray-900 sm:text-lg lg:text-xl font-poppins"
                  style={{ color: darkenColor(bgColors[pokemonId]) }}
                >
                  Dream World
                </h1>
              </div>
            )}

            {sprites?.other['showdown']?.front_default && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={sprites.other['showdown'].front_default}
                  alt={`${name} showdown`}
                  className="object-contain w-16 h-16 sm:w-28 sm:h-28"
                />
                <h1
                  className="text-sm italic font-semibold text-center text-gray-900 sm:text-lg lg:text-xl font-poppins"
                  style={{ color: darkenColor(bgColors[pokemonId]) }}
                >
                  Showdown
                </h1>
              </div>
            )}

            {sprites?.other['official-artwork']?.front_default && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={sprites.other['official-artwork'].front_default}
                  alt={`${name} official artwork`}
                  className="object-contain w-16 h-16 sm:w-28 sm:h-28"
                />
                <h1
                  className="text-sm italic font-semibold text-center text-gray-900 sm:text-lg lg:text-xl font-poppins"
                  style={{ color: darkenColor(bgColors[pokemonId]) }}
                >
                  Official Artwork
                </h1>
              </div>
            )}

            {sprites?.other['home']?.front_default && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={sprites.other['home'].front_default}
                  alt={`${name} home`}
                  className="object-contain w-16 h-16 sm:w-28 sm:h-28"
                />
                <h1
                  className="text-sm italic font-semibold text-center text-gray-900 sm:text-lg lg:text-xl font-poppins"
                  style={{ color: darkenColor(bgColors[pokemonId]) }}
                >
                  Home
                </h1>
              </div>
            )}
          </div>

          <h1
            className="py-2 mt-4 text-2xl font-extrabold text-center font-poppins"
            style={{ color: darkenColor(bgColors[pokemonId]) }}
          >
            Version Game
          </h1>
          <table className="w-full overflow-x-auto border-collapse table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border">Game</th>
                <th className="px-4 py-2 text-left border">Image</th>
                <th className="px-4 py-2 text-left border">Region</th>
                <th className="px-4 py-2 text-left border">Release Year</th>
                <th className="px-4 py-2 text-left border">Game Description</th>
                <th className="px-4 py-2 text-left border">Habitat</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sprites?.versions || {}).map(
                ([generation, versionData]) => {
                  return Object.entries(versionData).map(
                    ([version, images]) => {
                      if (
                        images.front_default ||
                        (images.animated && images.animated.front_default)
                      ) {
                        let region = '';
                        let releaseYear = '';
                        let gameDescription = '';

                        switch (generation) {
                          case 'generation-i':
                            region = 'Kanto';
                            releaseYear = '1996';
                            gameDescription =
                              'The very first Pokémon games that introduced players to the world of Pokémon. Available in Red, Blue, and Yellow versions.';
                            break;
                          case 'generation-ii':
                            region = 'Johto';
                            releaseYear = '1999';
                            gameDescription =
                              'Introduced new Pokémon, breeding, and day/night cycles in Gold, Silver, and Crystal versions.';
                            break;
                          case 'generation-iii':
                            region = 'Hoenn';
                            releaseYear = '2002';
                            gameDescription =
                              'Featured a new region, abilities, and double battles in Ruby, Sapphire, and Emerald.';
                            break;
                          case 'generation-iv':
                            region = 'Sinnoh';
                            releaseYear = '2006';
                            gameDescription =
                              'Added physical and special moves along with online trading in Diamond, Pearl, and Platinum.';
                            break;
                          case 'generation-v':
                            region = 'Unova';
                            releaseYear = '2010';
                            gameDescription =
                              'Offered a new region with 3D graphics and new battle features in Black and White.';
                            break;
                          case 'generation-vi':
                            region = 'Kalos';
                            releaseYear = '2013';
                            gameDescription =
                              'Introduced Mega Evolutions and 3D models in X and Y.';
                            break;
                          case 'generation-vii':
                            region = 'Alola';
                            releaseYear = '2016';
                            gameDescription =
                              'Added regional variants and Z-moves in Sun and Moon.';
                            break;
                          case 'generation-viii':
                            region = 'Galar';
                            releaseYear = '2019';
                            gameDescription =
                              'Introduced the Galar region and Dynamaxing in Sword and Shield.';
                            break;
                          default:
                            region = 'Unknown Region';
                            releaseYear = 'Unknown Year';
                            gameDescription = 'No description available.';
                            break;
                        }

                        return (
                          <tr
                            key={`${generation}-${version}`}
                            className="border"
                          >
                            <td className="px-4 py-2 border">
                              {`${generation.replace(
                                '-',
                                ' '
                              )} - ${version.replace('-', ' ')}`}
                            </td>
                            <td className="px-4 py-2 border">
                              <img
                                src={
                                  images.animated?.front_default ||
                                  images.front_default
                                }
                                alt={`${name} ${generation} ${version}`}
                                className="object-contain w-16 h-16 sm:w-28 sm:h-28"
                              />
                            </td>
                            <td className="px-4 py-2 text-center border">
                              {region}
                            </td>
                            <td className="px-4 py-2 text-center border">
                              {releaseYear}
                            </td>
                            <td className="px-4 py-2 text-center border">
                              {gameDescription}
                            </td>
                            <td className="px-4 py-2 text-center border">
                              {habitat}
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    }
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
