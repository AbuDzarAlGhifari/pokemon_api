import { useNavigate } from 'react-router-dom'


function Navbar() {
    const navigate = useNavigate()
    return (
        <div className='lg:flex md:flex flex-wrap justify-between items-center px-4 
        bg-gradient-to-r from-cyan-500 to-blue-500 py-4 shadow-md sticky top-0'>
            <div className="left flex items-center space-x-3">
                <h2 className="logo font-extrabold text-2xl text-black text-center">Pokedexku</h2>
            </div>
            <div className="right">
                <ul className='flex space-x-4 text-black justify-center'>
                <li
                    className='cursor-pointer font-semibold hover:font-extrabold hover:text-white hover:border-b hover:border-white hover:pb-0.5 transition-all duration-300' 
                    onClick={() => navigate('/')}>
                    Home
                </li>
                <li 
                    className='cursor-pointer font-semibold hover:font-extrabold hover:text-white hover:border-b hover:border-white hover:pb-0.5 transition-all duration-300' 
                    onClick={() => navigate('/cari')}>
                    Pokemon Search
                </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar