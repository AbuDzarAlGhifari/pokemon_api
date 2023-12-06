import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

const Find = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemonx, setPokemonx] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    sp_attack: "",
    sp_defense: "",
    speed: "",
    type: "",
    urut: "",
  });

  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemonx({
          name: pokemonName,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          sp_attack: response.data.stats[3].base_stat,
          sp_defense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          type: [
            response.data.types[0]?.type.name,
            response.data.types[1]?.type.name,
            response.data.types[3]?.type.name,
            response.data.types[4]?.type.name,
          ],
          urut: response.data.order,
        });
        setPokemonChosen(true);
      });
  };

  return (
    <div>
      <Navbar />
      <div className=" text-center w-full h-40">
        <h1 className="p-3 text-2xl font-extrabold text-sky-700">
          POKEMON SEARCH
        </h1>
        <input
          class=" rounded-lg border border-blue-gray-200 px-3 py-2.5 font-sans text-sm font-normal 
          text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 
          focus:border-2 focus:border-blue-700 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder="Pokemon Name "
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button
          className="m-2 bg-blue-200 hover:bg-blue-500 text-blue-700 font-semibold 
          hover:text-white py-2 px-5 border hover:border-blue-700 rounded-md"
          onClick={searchPokemon}>
          Search
        </button>
      </div>
      <div className="flex flex-col text-center items-center ">
        {!pokemonChosen ? (
          <h3 className="text-xl font-semibold">Chosen a Pokemon </h3>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{pokemonx.name}</h1>
            <img className="" src={pokemonx.img} />
            <div className="abilities">
              <>
                <div className="group">
                  <h1>{pokemonx.type}</h1>
                </div>
              </>
            </div>
            {/* <h3 className='text-lg font-semibold'>Type: {pokemonx.type}</h3> */}
            <h4>Hp: {pokemonx.hp}</h4>
            <h4>Attack: {pokemonx.attack}</h4>
            <h4>Defense: {pokemonx.defense}</h4>
            <h4>Special-Attack: {pokemonx.sp_attack}</h4>
            <h4>Special-Defense: {pokemonx.sp_defense}</h4>
            <h4>Speed: {pokemonx.speed}</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default Find;
