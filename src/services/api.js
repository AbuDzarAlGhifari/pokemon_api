import axios from 'axios';

const BASEAPI_URL = 'https://pokeapi.co/api/v2';

// Fetch all Pokemon with pagination
export const fetchAllPokemon = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

// Fetch Pokemon by Type
export const fetchPokemonByType = async (type) => {
  const response = await axios.get(`${BASEAPI_URL}/type/${type}`);
  return response.data.pokemon.map((p) => p.pokemon);
};

// Fetch all available types of Pokemon
export const fetchAllTypes = async () => {
  const response = await axios.get(`${BASEAPI_URL}/type`);
  return response.data.results;
};

// Fetch Random Pokemon [Landing Page]
export const fetchPokemonData = async () => {
  const randomId = Math.floor(Math.random() * 898) + 1;
  const response = await fetch(`${BASEAPI_URL}/pokemon/${randomId}`);

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
    const response = await axios.get(`${BASEAPI_URL}/pokemon?limit=10000`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching all Pokémon:', error);
    throw error;
  }
};

export const fetchPokemonDetailsSearch = async (pokemonName) => {
  const response = await fetch(`${BASEAPI_URL}/pokemon/${pokemonName}`);
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    types: data.types.map((typeInfo) => typeInfo.type.name),
  };
};

export const getPokemonDetails = async (id) => {
  try {
    const response = await axios.get(`${BASEAPI_URL}/pokemon/${id}`);
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
