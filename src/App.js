import React from 'react';
import Home from './Pages/Home';
import './Components/style.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetail from './Components/PokemonDetail';
import SearchResults from './Components/SearchResults';
import Navbar from './Components/Navbar';

const  App = () => {
  return (
  <Router>
    < Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route path="/search/:term" element={<SearchResults />} />
    </Routes>
  </Router>

  );
}

export default App;
