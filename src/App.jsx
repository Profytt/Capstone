import React, { useContext } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Products from './components/Products.jsx';
import ProductDetail from './components/ProductDetails.jsx';
import { ApiProvider } from './components/Api';

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} /> 
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}
export default App;