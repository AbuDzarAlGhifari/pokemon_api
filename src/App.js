import React from 'react';
import Home from './Pages/Home';
import './Components/style.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cari from './Pages/Cari';

const  App = () => {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/cari' element={<Cari />}></Route>
    </Routes>
  </Router>

  );
}

export default App;
