import { IoTimer } from 'react-icons/io5';
import { FaHeart, FaShieldAlt } from 'react-icons/fa';
import { RiSwordFill } from 'react-icons/ri';
import { SiCodemagic } from 'react-icons/si';
import { GiBorderedShield } from 'react-icons/gi';
import { MdCatchingPokemon } from 'react-icons/md';

export const typeColors = {
  normal: 'bg-gray-400 text-gray-800',
  fire: 'bg-red-700 text-red-100',
  water: 'bg-blue-700 text-blue-100',
  electric: 'bg-yellow-700 text-yellow-100',
  grass: 'bg-green-700 text-green-100',
  ice: 'bg-cyan-700 text-cyan-100',
  fighting: 'bg-orange-600 text-orange-100',
  poison: 'bg-purple-700 text-purple-100',
  ground: 'bg-yellow-600 text-yellow-900',
  flying: 'bg-blue-300 text-blue-900',
  psychic: 'bg-pink-700 text-pink-100',
  bug: 'bg-green-700 text-green-100',
  rock: 'bg-gray-600 text-gray-200',
  ghost: 'bg-indigo-700 text-indigo-100',
  dragon: 'bg-indigo-700 text-indigo-100',
  dark: 'bg-gray-800 text-gray-200',
  steel: 'bg-gray-700 text-gray-200',
  fairy: 'bg-pink-300 text-pink-800',
};

export const getStatIcon = {
  hp: FaHeart,
  attack: RiSwordFill,
  defense: FaShieldAlt,
  'special-attack': SiCodemagic,
  'special-defense': GiBorderedShield,
  speed: IoTimer,
  speed: IoTimer,
  'base-experience': MdCatchingPokemon,
};

export const getStatColor = {
  low: 'to-red-500',
  medium: 'to-green-500',
  high: 'to-blue-500',
};

export const getGameData = (sprites) => {
  const gameData = [];

  Object.entries(sprites?.versions || {}).forEach(
    ([generation, versionData]) => {
      Object.entries(versionData).forEach(([version, images]) => {
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

          gameData.push({
            generation,
            version,
            images,
            region,
            releaseYear,
            gameDescription,
          });
        }
      });
    }
  );

  return gameData;
};
