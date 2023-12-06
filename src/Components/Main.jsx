import React from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=12");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };
  useEffect(() => {
    pokeFun();
  }, [url]);
  return (
    <div>
      <Navbar />
      <div className="left-content ml-4 mt-5">
        <Card
          pokemon={pokeData}
          loading={loading}
          infoPokemon={(poke) => setPokeDex(poke)}
        />
      </div>
      <div className="flex p-4 text-xs sm:text-sm lg:text-lg gap-3 text-center text-white font-semibold">
        {prevUrl && (
          <button
            className="bg-[#b74555] rounded-md p-1 px-2 w-24 hover:bg-white hover:text-[#b74555]"
            onClick={() => {
              setPokeData([]);
              setUrl(prevUrl);
            }}>
            Previous
          </button>
        )}

        {nextUrl && (
          <button
            className="bg-[#b74555] rounded-md p-1 px-2 w-24 hover:bg-white hover:text-[#b74555]"
            onClick={() => {
              setPokeData([]);
              setUrl(nextUrl);
            }}>
            Next
          </button>
        )}
      </div>
      <div className="right-content">
        <Pokeinfo data={pokeDex} />
      </div>
    </div>
  );
};
export default Main;
