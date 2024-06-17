import React from "react";
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
    <BrowserRouter key={Math.random()}>
      <AuthProvider>
        <ApiProvider>
          <CartProvider> {/* Move CartProvider outside of Layout */}
            <Navbar /> {/* Navbar can now access both contexts */}
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Products />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
              </Route>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/cart" element={<Cart />} />
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
      <Outlet />  {/* This renders the child route's content */}
    </div>
  );
}
export default App;