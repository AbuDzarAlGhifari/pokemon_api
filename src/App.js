import React from 'react';
import Home from './Pages/Home';
import './Components/style.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetail from './Components/PokemonDetail';
import SearchResults from './Components/SearchResults';
import Navbar from './Components/Navbar';
import PageNotFound from './Pages/PageNotFound';
import Footer from './Components/Footer';
import MoveDetail from './Components/MoveDetail';

const  App = () => {
  return (
  <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route path="/search/:term" element={<SearchResults />} />
      <Route path="/moves/:moveName" element={<MoveDetail />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <Footer />
  </Router>

  );
}

export default App;
