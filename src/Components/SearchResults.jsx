import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchPokemonDetailsSearch,
  fetchAllPokemonSearch,
} from '../services/api';
import ColorThief from 'colorthief';
import typeColors from '../services/data';

const darkenColor = (color) => {
  const [r, g, b] = color;
  return `rgb(${Math.max(r - 50, 0)}, ${Math.max(g - 50, 0)}, ${Math.max(
    b - 50,
    0
  )})`;
};

const SearchResults = () => {
  const { term } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const allPokemon = await fetchAllPokemonSearch();
        const filtered = allPokemon.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(term.toLowerCase())
        );

        const promises = filtered.map((pokemon) =>
          fetchPokemonDetailsSearch(pokemon.name)
        );

        const pokemonWithImages = await Promise.all(promises);
        setResults(pokemonWithImages);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [term]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Search Results for: "{term}"</h1>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
        {results.length > 0 ? (
          results.map((pokemon) => (
            <div
              key={pokemon.name}
              style={{ backgroundColor: bgColors[pokemon.name] || 'gray' }}
              className="flex items-center justify-center py-2 mb-2 text-center border border-gray-500 rounded-md cursor-pointer hover:border-orange-950 sm:text-lg lg:text-xl font-poppins"
            >
              <div>
                <div className="flex items-center justify-center">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-10 h-10 sm:w-24 lg:w-36 sm:h-24 lg:h-36"
                    crossOrigin="anonymous"
                    onLoad={(e) => handleImageLoad(e.target, pokemon.name)}
                  />
                </div>
                <h1
                  className="text-xs font-extrabold capitalize sm:text-lg"
                  style={{
                    color: darkenColor(
                      bgColors[pokemon.name]
                        ? bgColors[pokemon.name].match(/\d+/g).map(Number)
                        : [128, 128, 128]
                    ),
                  }}
                >
                  {pokemon.name}
                </h1>
                {/* Display Pokemon Types */}
                <div className="flex justify-center mt-1 space-x-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className={`px-2 py-1 mx-1 font-poppins font-medium text-[10px] sm:text-sm rounded-lg ${
                        typeColors[type] || 'bg-gray-400'
                      }`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
