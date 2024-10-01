import React, { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useDebounce from '../hook/useDebounce';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10000`
      );
      const allPokemon = response.data.results;
      const filtered = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );

      const promises = filtered
        .slice(0, 10)
        .map((pokemon) =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        );

      const pokemonDetails = await Promise.all(promises);
      const pokemonWithImages = pokemonDetails.map((detail) => ({
        name: detail.data.name,
        image: detail.data.sprites.front_default,
      }));

      setFilteredPokemon(pokemonWithImages);
    } catch (error) {
      console.error('Error fetching data', error);
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

  return (
    <nav className="px-4 py-4 bg-orange-600 shadow-2xl shadow-black lg:px-6">
      <div className="container items-center justify-between mx-auto sm:flex">
        <Link to="/" className="flex items-center justify-center text-center">
          <p className="text-xl italic font-semibold text-center text-yellow-100 exp sm:text-left font-poppins sm:text-2xl lg:text-2xl">
            <span className="font-extrabold text-yellow-400 text-x sm:text-2xl lg:text-3xl">
              AB
            </span>
            pokemon
          </p>
        </Link>
        <div className="flex items-center mt-3 sm:mt-0">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative flex items-center">
              <IoSearchSharp className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600 text-orange-900" />

              <input
                className="w-full py-2 pl-10 pr-3 text-sm text-orange-900 bg-orange-100 border border-orange-700 rounded-md shadow-sm focus:outline-none placeholder:text-orange-700"
                placeholder="Search Pokemon"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
            </div>

            {/* Dropdown for predictions */}
            {loading && (
              <div className="absolute z-10 w-full p-2 mt-1 text-center bg-orange-50">
                Loading...
              </div>
            )}

            {filteredPokemon.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 border rounded-md shadow-lg bg-orange-50 border-orange-300-300">
                {filteredPokemon.map((pokemon, index) => (
                  <li
                    key={index}
                    className="flex items-center p-2 rounded-md cursor-pointer hover:bg-orange-100"
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
