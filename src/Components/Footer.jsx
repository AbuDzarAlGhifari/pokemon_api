import React from 'react';

const Footer = () => {
  return (
    <div className="py-1 text-center bg-gray-600 ">
      <p className="py-1 text-xs italic font-semibold text-center text-white font-poppins sm:text-sm">
        {`Created by `}
        <span className="text-gray-300 hover:text-gray-900">
          <a href="https://abudzaralghifari.vercel.app/" target="_blank">
            Abu Dzar Al Ghifari (2023)
          </a>
        </span>
      </p>
      <p className="py-1 text-xs italic font-semibold text-center text-white font-poppins sm:text-sm">
        Powered by{' '}
        <span className="text-gray-300 hover:text-gray-900">
          <a href="https://pokeapi.co/" target="_blank">
            PokeAPI V2
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
