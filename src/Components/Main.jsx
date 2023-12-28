import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=9");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    setCurrentPage(getPageNumber(url));
    setTotalPages(getTotalPages(res.data.count));
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

  const getPageNumber = (url) => {
    const match = url.match(/offset=(\d+)/);
    return match ? Math.ceil((parseInt(match[1], 10) + 1) / 9) : 1;
  };

  const getTotalPages = (totalCount) => {
    return Math.ceil(totalCount / 9);
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <div className="flex bg-yellow-200 min-h-screen">
      <div className="left-content pt-4">
        <Card
          pokemon={pokeData}
          loading={loading}
          infoPokemon={(poke) => setPokeDex(poke)}
        />
        <div className="flex py-2 sm:py-4 px-2 sm:px-3 lg:px-8 text-[9px] sm:text-sm lg:text-lg gap-3 text-center text-white font-semibold">
          {prevUrl && (
            <button
              className="bg-orange-700 hover:bg-orange-900 border-2 border-orange-800 hover:border-orange-950 text-orange-200 px-2 py-1 rounded-md font-poppins font-semibold transition-all"
              onClick={() => {
                setPokeData([]);
                setUrl(prevUrl);
              }}>
              Previous
            </button>
          )}

          {nextUrl && (
            <button
              className="bg-orange-700 hover:bg-orange-900 border-2 border-orange-800 hover:border-orange-950 text-orange-200 px-2 py-1 rounded-md font-poppins font-semibold transition-all"
              onClick={() => {
                setPokeData([]);
                setUrl(nextUrl);
              }}>
              Next
            </button>
          )}
          <span className="flex items-center justify-center font-poppins font-bold text-orange-950 text-[9px] sm:text-sm lg:text-lg">
            {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      <div className="pt-4 mx-1 right-content">
        <Pokeinfo data={pokeDex} />
      </div>
    </div>
  );
};

export default Main;
