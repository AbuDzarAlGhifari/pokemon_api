import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchPokemonDetailsSearch,
  fetchAllPokemonSearch,
} from '../services/api';

const SearchResults = () => {
  const { term } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <h1 className="mb-4 text-2xl font-bold text-center">
        Search Results for: "{term}"
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.length > 0 ? (
          results.map((pokemon) => (
            <div
              key={pokemon.name}
              className="flex flex-col items-center p-4 bg-white border border-gray-300 rounded-lg shadow-md"
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-24 h-24"
              />
              <h2 className="mt-2 text-lg font-semibold">{pokemon.name}</h2>
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
