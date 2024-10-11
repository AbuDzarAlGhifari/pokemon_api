import { IoTimer } from 'react-icons/io5';
import { FaHeart, FaShieldAlt } from 'react-icons/fa';
import { RiSwordFill } from 'react-icons/ri';
import { SiCodemagic } from 'react-icons/si';
import { GiBorderedShield } from 'react-icons/gi';

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
};

export const getStatColor = {
  low: 'to-red-500',
  medium: 'to-green-500',
  high: 'to-blue-500',
};
