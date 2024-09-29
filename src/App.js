import React from 'react';
import Home from './Pages/Home';
import './Components/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetail from './Components/PokemonDetail';
import SearchResults from './Components/SearchResults';
import PageNotFound from './Pages/PageNotFound';
import MoveDetail from './Components/MoveDetail';
import Landing from './Pages/Landing';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/search/:term" element={<SearchResults />} />
        <Route path="/moves/:moveName" element={<MoveDetail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
