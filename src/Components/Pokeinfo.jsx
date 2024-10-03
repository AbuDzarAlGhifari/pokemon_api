import React, { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import typeColors from './data';
import ColorThief from 'colorthief';

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

  if (!openModal) return null;

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const { id, name, height, weight, types, stats, sprites } = data;

  return (
    <Dialog
      open={openModal}
      handler={closeModal}
      onClick={handleOverlayClick}
      size="sm"
      style={{ backgroundColor: bgColors[id] || 'gray' }}
    >
      <DialogHeader className="flex items-center justify-between">
        <h2 className="text-lg">Pokemon Info</h2>
        <button type="button" className="text-gray-700" onClick={closeModal}>
          <IoClose className="w-6 h-6" />
        </button>
      </DialogHeader>
      <DialogBody className="grid grid-cols-12 ">
        <div className="col-span-6">
          <div className="flex items-center justify-center">
            <img
              src={sprites?.other['official-artwork']?.front_default}
              alt={name}
              className="w-24 h-24 sm:w-40 lg:w-36 sm:h-36 lg:h-40"
              crossOrigin="anonymous"
              onLoad={(e) => handleImageLoad(e.target, id)}
            />
          </div>
          <h2 className="py-2 text-lg font-extrabold text-center font-poppins">
            {name}
          </h2>
          <div className="flex items-center justify-center gap-1">
            {types.map((type) => (
              <span
                key={type.type.name}
                className={`px-2 py-1 mx-1 text-white text-[10px] sm:text-sm rounded-lg ${
                  typeColors[type.type.name] || 'bg-gray-400'
                }`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-6 py-2 text-xs bg-gray-200 bg-opacity-60 rounded-b-md sm:text-lg font-poppins text-gray-950">
          <div className="flex items-center justify-center gap-1 pt-1 font-bold">
            <h1>Height: {height},</h1>
            <h1>Weight: {weight}</h1>
          </div>
          <div className="flex flex-col font-bold font-poppins">
            {stats.map((stat) => (
              <div key={stat.stat.name}>
                <p className="mx-1 text-sm text-left sm:mx-8 sm:text-lg">
                  {stat.stat.name}
                </p>
                <div className="relative h-2 mx-1 bg-gray-400 rounded-sm sm:h-5 sm:mx-8">
                  <div
                    className="h-full bg-gray-700 rounded-sm"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>
                  <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-gray-950">
                    {stat.base_stat} / 255
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-center w-full">
        <Link to={`/pokemon/${name}`} className="w-1/2">
          <Button fullWidth>More Info</Button>
        </Link>
      </DialogFooter>
    </Dialog>
  );
};

export default Pokeinfo;
