import { Button, Option, Select, Spinner } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';
import CardPokemon from '../Components/Card/CardPokemon';
import ModalPokemonInfo from '../Components/Modal/ModalPokemonInfo';
import {
  fetchAllPokemon,
  fetchAllTypes,
  fetchPokemonByType,
} from '../services/api';

const Home = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [filteredPage, setFilteredPage] = useState(1);
  const [totalFilteredPages, setTotalFilteredPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pokeDex, setPokeDex] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${
      (currentPage - 1) * 15
    }`
  );

  const scrollTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  const getTotalPages = (totalCount) => Math.ceil(totalCount / 15);

  const handleInfoPokemon = (pokemon) => {
    setPokeDex(pokemon);
    setOpenModal(true);
  };

  const handlePageChange = (newUrl, newPage, isFiltered = false) => {
    if (isFiltered) {
      setFilteredPage(newPage);
      handleTypeFilter(selectedType, newPage);
    } else if (newUrl) {
      setPokeData([]);
      setUrl(newUrl);
      setSearchParams({ page: newPage });
    }
    scrollTop();
  };

  const handleTypeFilter = (type, page = 1) => {
    setSelectedType(type);
    setPokeData([]);
    if (type) {
      fetchPokemonByTypePaginated(type, page);
    } else {
      fetchPokemon();
    }
  };

  const fetchPokemonByTypePaginated = async (type, page = 1) => {
    setLoading(true);
    const filteredPokemon = await fetchPokemonByType(type);

    const limit = 15;
    const offset = (page - 1) * limit;
    const paginatedPokemon = filteredPokemon.slice(offset, offset + limit);

    setTotalFilteredPages(Math.ceil(filteredPokemon.length / limit));
    getPokemon(paginatedPokemon);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    const newPokeData = await Promise.all(
      res.map(async (item) => {
        const result = await fetchAllPokemon(item.url);
        return result;
      })
    );
    setPokeData(newPokeData.sort((a, b) => (a.id > b.id ? 1 : -1)));
  };

  const fetchPokemon = async () => {
    setLoading(true);
    const data = await fetchAllPokemon(url);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setTotalPages(getTotalPages(data.count));
    getPokemon(data.results);
    setLoading(false);
  };

  const fetchTypes = async () => {
    const allTypes = await fetchAllTypes();
    setTypes(allTypes);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    if (!selectedType) {
      fetchPokemon();
    }
  }, [url, selectedType]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner className="w-16 h-16 text-gray-900/50" />
        </div>
      ) : (
        <div className="mx-auto max-w-7xl">
          <div className="flex mx-4 pt-7 w-fit">
            <Select
              label="Select Type"
              color="gray"
              onChange={handleTypeFilter}
              className="capitalize"
            >
              <Option
                value=""
                className={`capitalize ${
                  selectedType === '' ? 'bg-blue-500 text-white' : ''
                }`}
              >
                All Types
              </Option>
              {types.map((type) => (
                <Option
                  key={type.name}
                  value={type.name}
                  className={`capitalize ${
                    selectedType === type.name ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  {type.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="bg-gray-300">
            <div className="pt-4 mx-1 sm:mx-4">
              <CardPokemon pokemon={pokeData} infoPokemon={handleInfoPokemon} />
            </div>

            {selectedType ? (
              <div className="flex justify-center py-2 sm:py-4 px-2 sm:px-3 lg:px-8 text-[9px] sm:text-sm lg:text-lg gap-3 text-center text-gray-900 font-semibold items-center">
                <Button
                  size="sm"
                  color="gray"
                  onClick={() => handlePageChange(null, filteredPage - 1, true)}
                  disabled={filteredPage === 1}
                >
                  <IoChevronBack className="w-4 h-4" />
                </Button>

                <span className="font-poppins font-bold text-gray-950 text-[9px] sm:text-sm lg:text-lg">
                  {filteredPage} of {totalFilteredPages}
                </span>

                <Button
                  size="sm"
                  color="gray"
                  onClick={() => handlePageChange(null, filteredPage + 1, true)}
                  disabled={filteredPage === totalFilteredPages}
                >
                  <IoChevronForward className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex justify-center py-2 sm:py-4 px-2 sm:px-3 lg:px-8 text-[9px] sm:text-sm lg:text-lg gap-3 text-center text-gray-900 font-semibold items-center">
                <Button
                  size="sm"
                  color="gray"
                  onClick={() => handlePageChange(prevUrl, currentPage - 1)}
                  disabled={!prevUrl}
                >
                  <IoChevronBack className="w-4 h-4" />
                </Button>

                <span className="font-poppins font-bold text-gray-950 text-[9px] sm:text-sm lg:text-lg">
                  {currentPage} of {totalPages}
                </span>

                <Button
                  size="sm"
                  color="gray"
                  onClick={() => handlePageChange(nextUrl, currentPage + 1)}
                  disabled={!nextUrl}
                >
                  <IoChevronForward className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <ModalPokemonInfo
        data={pokeDex}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default Home;
