import React from 'react';
import Home from './Pages/Home';
import './Components/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetail from './Components/PokemonDetail';
import SearchResults from './Components/SearchResults';
import PageNotFound from './Pages/PageNotFound';
import MoveDetail from './Components/MoveDetail';
import Landing from './Pages/Landing';
import Layout from './Components/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/pokemon/:id"
          element={
            <Layout>
              <PokemonDetail />
            </Layout>
          }
        />
        <Route
          path="/search/:term"
          element={
            <Layout>
              <SearchResults />
            </Layout>
          }
        />
        <Route
          path="/moves/:moveName"
          element={
            <Layout>
              <MoveDetail />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
