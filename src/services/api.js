import axios from 'axios';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

// Fetch all Pokemon with pagination
export const fetchAllPokemon = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

// Fetch Pokemon by Type
export const fetchPokemonByType = async (type) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  return response.data.pokemon.map((p) => p.pokemon);
};

// Fetch a single Pokemon's details
export const fetchPokemonDetails = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

// Fetch all available types of Pokemon
export const fetchAllTypes = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/type');
  return response.data.results;
};

// Fetch Random Pokemon
export const fetchPokemonData = async () => {
  const randomId = Math.floor(Math.random() * 898) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon data');
  }

  const data = await response.json();
  const imageUrl = data.sprites.other['official-artwork'].front_default;
  const statsData = data.stats;
  return { imageUrl, statsData };
};

export const fetchAllPokemonSearch = async () => {
  try {
    const response = await axios.get(`${POKEAPI_URL}?limit=10000`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching all Pokémon:', error);
    throw error;
  }
};

export const fetchPokemonDetailsSearch = async (pokemonName) => {
  try {
    const response = await axios.get(`${POKEAPI_URL}/${pokemonName}`);
    return {
      name: response.data.name,
      image: response.data.sprites.front_default,
    };
  } catch (error) {
    console.error(`Error fetching details for ${pokemonName}:`, error);
    throw error;
  }
};

export const getPokemonDetails = async (id) => {
  try {
    const response = await axios.get(`${POKEAPI_URL}/${id}`);
    const speciesResponse = await axios.get(response.data.species.url);
    const evolutionChainResponse = await axios.get(
      speciesResponse.data.evolution_chain.url
    );

    return {
      pokemon: response.data,
      evolutionChain: evolutionChainResponse.data,
    };
  } catch (error) {
    throw new Error('Error fetching Pokémon details: ' + error.message);
  }
};
