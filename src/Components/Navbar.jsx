import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-between items-center px-4 bg-gradient-to-r from-cyan-500 to-blue-500 py-4 shadow-md sticky top-0">
      <h2 className="font-semibold text-2xl text-black text-center">
        Pokedexku
      </h2>
      <ul className="flex space-x-1 text-black justify-center">
        <li>|</li>
        <li
          className="cursor-pointer font-semibold hover:font-extrabold hover:text-white hover:border-b hover:border-white hover:pb-0.5 transition-all duration-300"
          onClick={() => navigate("/")}>
          Home
        </li>
        <li>|</li>
        <li
          className="cursor-pointer font-semibold hover:font-extrabold hover:text-white hover:border-b hover:border-white hover:pb-0.5 transition-all duration-300"
          onClick={() => navigate("/cari")}>
          Pokemon Search
        </li>
        <li>|</li>
      </ul>
    </div>
  );
}

export default Navbar;
