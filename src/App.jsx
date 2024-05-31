import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApiProvider } from './components/Api';

function App() {
  return (
    <ApiProvider>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetail />} /> 
      </Routes>
    </ApiProvider>
  );
}

export default App;