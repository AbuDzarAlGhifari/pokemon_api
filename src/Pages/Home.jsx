import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import Pokeinfo from '../Components/Pokeinfo';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Button } from '@material-tailwind/react';

const Home = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=12');
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pokeDex, setPokeDex] = useState();
  const [openModal, setOpenModal] = useState(false);

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
    const newPokeData = await Promise.all(
      res.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );
    setPokeData((state) => {
      const sortedData = [...state, ...newPokeData].sort((a, b) =>
        a.id > b.id ? 1 : -1
      );
      return sortedData;
    });
  };

  const getPageNumber = (url) => {
    const match = url.match(/offset=(\d+)/);
    const offset = match ? parseInt(match[1], 10) : 0;
    return Math.ceil(offset / 12) + 1;
  };

  const getTotalPages = (totalCount) => {
    return Math.ceil(totalCount / 12);
  };

  const handleInfoPokemon = (poke) => {
    setPokeDex(poke);
    setOpenModal(true);
  };

  const handlePageChange = (newUrl) => {
    if (newUrl) {
      setPokeData([]);
      setUrl(newUrl);
    }
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-yellow-50 scrollbar-thin scrollbar-thumb-orange-800 scrollbar-track-orange-500">
        <div className="bg-yellow-50">
          <div className="pt-4 mx-1 sm:mx-4">
            <Card
              pokemon={pokeData}
              loading={loading}
              infoPokemon={handleInfoPokemon}
            />
          </div>
          <div className="flex justify-center py-2 sm:py-4 px-2 sm:px-3 lg:px-8 text-[9px] sm:text-sm lg:text-lg gap-3 text-center text-orange-900 font-semibold items-center">
            <Button
              size="sm"
              color="orange"
              onClick={() => handlePageChange(prevUrl)}
              disabled={!prevUrl}
            >
              <IoChevronBack className="w-4 h-4" />
            </Button>

            <span className="font-poppins font-bold text-orange-950 text-[9px] sm:text-sm lg:text-lg">
              {currentPage} of {totalPages}
            </span>

            <Button
              size="sm"
              color="orange"
              onClick={() => handlePageChange(nextUrl)}
              disabled={!nextUrl}
            >
              <IoChevronForward className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
      <Pokeinfo
        data={pokeDex}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default Home;
