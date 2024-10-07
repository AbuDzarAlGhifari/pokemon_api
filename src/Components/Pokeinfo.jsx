import React, { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { IoClose, IoTimer } from 'react-icons/io5';
import typeColors from '../services/data';
import ColorThief from 'colorthief';
import { FaHeart, FaShieldAlt } from 'react-icons/fa';
import { RiSwordFill } from 'react-icons/ri';
import { SiCodemagic } from 'react-icons/si';
import { GiBorderedShield } from 'react-icons/gi';

const Pokeinfo = ({ data, openModal, setOpenModal }) => {
  const [bgColors, setBgColors] = useState({});
  const colorThief = useRef(new ColorThief());

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

  if (!openModal) return null;

  const closeModal = () => setOpenModal(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
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
      default:
        return null;
    }
  };

  const { id, name, height, weight, types = [], stats = [], sprites } = data;

  return (
    <Dialog
      open={openModal}
      handler={closeModal}
      onClick={handleOverlayClick}
      size="sm"
      className="rounded-md"
      style={{ backgroundColor: bgColors[id] || 'gray' }}
    >
      <DialogHeader className="flex items-center justify-between">
        <h2 className="text-lg text-gray-800">Pokemon Info</h2>
        <button type="button" className="text-gray-700" onClick={closeModal}>
          <IoClose className="w-6 h-6 text-gray-800" />
        </button>
      </DialogHeader>
      <DialogBody className="grid grid-cols-12">
        <div className="col-span-5 sm:col-span-6">
          <div className="flex items-center justify-center h-full">
            <img
              src={sprites?.other['official-artwork']?.front_default}
              alt={name}
              crossOrigin="anonymous"
              onLoad={(e) => handleImageLoad(e.target, id)}
            />
          </div>
        </div>
        <div className="col-span-7 px-2 py-2 text-xs rounded-md sm:py-4 sm:px-0 sm:col-span-6 bg-opacity-40 bg-gray-50 sm:text-lg font-poppins">
          <h2
            className="py-2 text-lg font-extrabold text-center capitalize font-poppins"
            style={{ color: darkenColor(bgColors[id]) }}
          >
            {name}
          </h2>
          <div className="flex items-center justify-center gap-1">
            {types.map((type) => (
              <span
                key={type.type.name}
                className={`px-2 py-1 mx-1 font-poppins font-medium text-[10px] sm:text-sm rounded-lg ${
                  typeColors[type.type.name] || 'bg-gray-400'
                }`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div
            className="flex items-center justify-center gap-2 pb-3 font-bold"
            style={{ color: darkenColor(bgColors[id]) }}
          >
            <h1 className="text-sm sm:text-md">Height: {height}</h1>
            <span className="mx-2">|</span>
            <h1 className="text-sm sm:text-md">Weight: {weight}</h1>
          </div>

          <div className="flex flex-col font-bold font-poppins">
            {stats.map((stat) => (
              <div key={stat.stat.name} className="my-0.5">
                <p
                  className="mx-1 text-sm capitalize sm:mx-8 sm:text-md"
                  style={{ color: darkenColor(bgColors[id]) }}
                >
                  {getStatIcon(stat.stat.name)} {stat.stat.name}
                </p>
                <div className="relative h-3 mx-1 overflow-hidden bg-gray-400 rounded-sm sm:h-3.5 sm:mx-8">
                  <div
                    className={`h-full rounded-sm bg-gradient-to-r from-gray-500  ${getStatColor(
                      stat.base_stat
                    )}`}
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>
                  <p
                    className="absolute top-0 right-0 mr-1 text-[10px] sm:text-xs "
                    style={{ color: darkenColor(bgColors[id]) }}
                  >
                    {stat.base_stat} / 255
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-center w-full">
        <Link to={`/pokemon/${id}`} className="w-1/2">
          <Button fullWidth className="bg-gray-800">
            More Info
          </Button>
        </Link>
      </DialogFooter>
    </Dialog>
  );
};

export default Pokeinfo;
