import React from "react";

const Footer = () => {
  return (
    <div className="bg-orange-600 py-1 text-center ">
      <p className="py-1 font-poppins italic font-semibold text-center text-white text-xs sm:text-sm">
        {`Created by `}
        <span className="text-yellow-300 hover:text-orange-950">
          <a href="https://abudzaralghifari.vercel.app/" target="_blank">
            Abu Dzar Al Ghifari (2023)
          </a>
        </span>
      </p>
      <p className="py-1 font-poppins italic font-semibold text-center text-white text-xs sm:text-sm">
        Powered by{" "}
        <span className="text-yellow-300 hover:text-orange-950">
          <a href="https://pokeapi.co/" target="_blank">
            PokeAPI V2
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
