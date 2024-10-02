import React from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const Pokeinfo = ({ data, openModal, setOpenModal }) => {
  if (!openModal) return null;

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const { name, id, height, weight, types, stats } = data;

  return (
    <Dialog
      open={openModal}
      handler={closeModal}
      onClick={handleOverlayClick}
      size="sm"
      className="bg-yellow-50"
    >
      <DialogHeader className="flex items-center justify-between">
        <h2 className="text-lg">Pokemon Info</h2>
        <button type="button" className="text-gray-700" onClick={closeModal}>
          <IoClose className="w-6 h-6" />
        </button>
      </DialogHeader>
      <DialogBody className="grid grid-cols-12 rounded-md bg-yellow-50 border-orange-950 bg-opacity-40">
        <div className="col-span-6">
          <div className="flex items-center justify-center">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
              alt={name}
              className="w-24 h-24 sm:w-40 lg:w-36 sm:h-36 lg:h-40"
            />
          </div>
          <h2 className="py-2 text-lg font-extrabold text-center font-poppins">
            {name}
          </h2>
          <div className="flex items-center justify-center gap-1">
            {types.map((type) => (
              <div
                key={type.type.name}
                className="p-1 px-2 text-orange-200 bg-orange-900 rounded-lg"
              >
                <p>{type.type.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-6 py-2 text-xs bg-orange-200 border-t-2 bg-opacity-60 rounded-b-md border-orange-950 sm:text-lg font-poppins text-orange-950">
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
                    className="h-full bg-orange-700 rounded-sm"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>
                  <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-orange-950">
                    {stat.base_stat} / 255
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Link to={`/pokemon/${name}`}>
          <Button color="deep-orange">More Info</Button>
        </Link>
      </DialogFooter>
    </Dialog>
  );
};

export default Pokeinfo;
