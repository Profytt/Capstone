import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetails";
import { ApiProvider } from "./components/Api";
import { AuthProvider } from "./components/Auth";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { CartProvider } from './components/CartApi';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <ApiProvider>
          <CartProvider>
            <Navbar /> 
            <Routes>
              
              <Route path="/" element={<Layout />}>
                <Route index element={<Products />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} /> 
              </Route>
              
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
            </Routes>
          </CartProvider>
        </ApiProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <Outlet />  
    </div>
  );
}
export default App;