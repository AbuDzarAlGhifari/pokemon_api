import React from 'react';
import Main from '../Components/Main';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-yellow-200 scrollbar-thin scrollbar-thumb-orange-800 scrollbar-track-orange-500">
        <Main />
      </div>
      <Footer />
    </>
  );
};

export default Home;
