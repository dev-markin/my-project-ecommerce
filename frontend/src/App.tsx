import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Orders from './Orders';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
