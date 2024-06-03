import React, { useContext } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Products from './components/Products.jsx';
import ProductDetail from './components/ProductDetails.jsx';
import { ApiProvider } from './components/Api.jsx';
import { AuthProvider } from "./components/Auth.jsx";
import LoginForm from './components/LoginForm.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <ApiProvider>
          <Navbar />
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/product/:productId" element={<ProductDetail />} /> 
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
            </Routes>
        </ApiProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;

