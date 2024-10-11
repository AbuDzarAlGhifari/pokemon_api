import React, { useState, useEffect, useRef } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import {
  fetchAllPokemonSearch,
  fetchPokemonDetailsSearch,
} from '../services/api';
import useDebounce from '../hook/useDebounce';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, 350);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchPokemon(debouncedSearchTerm);
    } else {
      setFilteredPokemon([]);
    }
  }, [debouncedSearchTerm]);

  const fetchPokemon = async (query) => {
    setLoading(true);
    try {
      const allPokemon = await fetchAllPokemonSearch();
      const filtered = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );

      const promises = filtered
        .slice(0, 10)
        .map((pokemon) => fetchPokemonDetailsSearch(pokemon.name));

      const pokemonWithImages = await Promise.all(promises);
      setFilteredPokemon(pokemonWithImages);
    } catch (error) {
      console.error('Error fetching Pokémon data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setFilteredPokemon([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setFilteredPokemon([]);
  };

  // Handle click outside of suggestions
  const handleClickOutside = (event) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setFilteredPokemon([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="px-2 py-2 bg-gray-900 sm:px-4 sm:py-4 lg:px-6">
      <div className="items-center justify-between mx-auto max-w-7xl sm:flex">
        <Link to="/" className="flex items-center justify-center text-center">
          <p className="text-xl italic font-semibold text-center text-gray-100 exp sm:text-left font-poppins sm:text-2xl lg:text-2xl">
            <span className="font-extrabold text-gray-500 text-x sm:text-2xl lg:text-3xl">
              AB
            </span>
            pokemon
          </p>
        </Link>

        <div className="flex items-center mt-3 sm:mt-0">
          <div className="flex gap-4 mr-3 text-xl text-gray-200">
            <Link
              to="/home"
              className="cursor-pointer hover:text-blue-gray-700"
            >
              PokeDex
            </Link>
            <Link
              to="/game"
              className="cursor-pointer hover:text-blue-gray-700"
            >
              Game
            </Link>
          </div>
          <div
            className="w-full max-w-sm min-w-[200px] relative"
            ref={suggestionsRef}
          >
            <div className="relative flex items-center">
              <IoSearchSharp className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600 text-gray-900" />
              <input
                className="w-full py-2 pl-10 pr-3 text-sm text-gray-900 bg-gray-100 border border-gray-700 rounded-md shadow-sm focus:outline-none placeholder:text-gray-700"
                placeholder="Search Pokemon"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </div>

            {loading && (
              <div className="absolute z-10 w-full p-2 mt-1 text-center bg-gray-50">
                Loading...
              </div>
            )}

            {filteredPokemon.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 border rounded-md shadow-lg bg-gray-50 border-gray-300-300">
                {filteredPokemon.map((pokemon, index) => (
                  <li
                    key={index}
                    className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(pokemon)}
                  >
                    <img
                      src={pokemon.image}
                      alt={pokemon.name}
                      className="w-8 h-8 mr-2"
                    />
                    {pokemon.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
