import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${searchTerm}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="bg-orange-600 py-4 px-4 lg:px-6">
      <div className="container mx-auto sm:flex items-center justify-between">
        <Link to="/" className="flex items-center justify-center text-center">
          <p className="exp text-center sm:text-left text-yellow-100 italic font-poppins font-semibold text-xl sm:text-2xl lg:text-2xl"><span className="text-x sm:text-2xl lg:text-3xl text-yellow-400 font-extrabold">AB</span>pokemon</p>
        </Link>
        <div className="flex items-center mt-3 sm:mt-0">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mr-2 px-2 py-1 w-full rounded-md border-2 border-orange-800"
          />
          <button
            onClick={handleSearch}
            className="bg-orange-700 hover:bg-orange-900 border-2 border-orange-800 hover:border-orange-950 text-orange-200 px-2 py-1 rounded-md font-poppins font-semibold transition-all">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
