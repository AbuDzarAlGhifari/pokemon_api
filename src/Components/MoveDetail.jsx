import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const MoveDetail = () => {
  const { moveName } = useParams();
  const [move, setMove] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/move/${moveName}`
        );
        setMove(response.data);
      } catch (error) {
        console.error("Error fetching move data:", error);
      }
    };

    fetchData();
  }, [moveName]);

  if (!move) {
    return <div className="bg-yellow-200 min-h-screen py-4">Loading...</div>;
  }

  const { name, power, pp, accuracy, effect_entries } = move;

  return (
    <div className="bg-yellow-200 min-h-screen py-4">
      <h1
        className="flex mx-3 sm:mx-4 lg:mx-6 text-sm sm:text-lg lg:text-xl font-poppins font-extrabold cursor-pointer justify-end underline italic text-orange-600 hover:text-orange-950"
        onClick={() => navigate(-1)}>
        Back
      </h1>
      <div className="mt-2 mx-2 sm:mx-4 lg:mx-6 rounded-md border-2 border-orange-950 bg-orange-600 bg-opacity-40">
        <div className="bg-orange-500  py-2   font-poppins text-orange-950">
          <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-poppins font-extrabold text-orange-950 mb-3 sm:mb-4 lg:mb-5 bg-orange-500 bg-opacity-60 rounded-t-md py-2 border-b-2 border-orange-950">
            {name}
          </h2>
          <div className="flex flex-col">
            <p className="text-left mx-1 sm:mx-8 text-sm sm:text-lg">Power</p>
            <div className="bg-gray-400 h-3 sm:h-5 relative rounded-sm mx-1 sm:mx-8">
              <div
                className="bg-orange-700 h-full rounded-sm"
                style={{ width: `${(power / 100) * 100}%` }}></div>
              <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-orange-950">
                {power}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-left mx-1 sm:mx-8 text-sm sm:text-lg">PP</p>
            <div className="bg-gray-400 h-3 sm:h-5 relative rounded-sm mx-1 sm:mx-8">
              <div
                className="bg-orange-700 h-full rounded-sm"
                style={{ width: `${(pp / 100) * 100}%` }}></div>
              <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-orange-950">
                {pp}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-left mx-1 sm:mx-8 text-sm sm:text-lg">
              Accuracy
            </p>
            <div className="bg-gray-400 h-3 sm:h-5 relative rounded-sm mx-1 sm:mx-8">
              <div
                className="bg-orange-700 h-full rounded-sm"
                style={{ width: `${(accuracy / 100) * 100}%` }}></div>
              <p className="absolute top-0 right-0 mr-1 text-[9px] sm:text-sm text-orange-950">
                {accuracy}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-extrabold font-poppins text-orange-950 mb-2">
              Effect
            </h2>
            {effect_entries.map((entry, index) => (
              <p
                key={index}
                className="text-justify mx-1 sm:mx-4 text-sm sm:text-lg lg:text-xl">
                {entry.effect}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveDetail;
