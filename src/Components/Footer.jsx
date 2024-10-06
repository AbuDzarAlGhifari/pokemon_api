import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="py-1 text-center bg-gray-900">
      <p className="py-1 text-xs italic font-semibold text-center text-white font-poppins sm:text-sm">
        {`Created by `}
        <span className="text-gray-300 hover:text-gray-500">
          <Link to="https://abudzaralghifari.vercel.app/" target="_blank">
            Abu Dzar Al Ghifari (2023)
          </Link>
        </span>
      </p>
      <p className="py-1 text-xs italic font-semibold text-center text-white font-poppins sm:text-sm">
        Powered by{' '}
        <span className="text-gray-300 hover:text-gray-500">
          <Link to="https://pokeapi.co/" target="_blank">
            PokeAPI V2
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Footer;
