import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth"; // Assuming AuthContext is in the same directory
import NavigationLinks from "./NavigationLinks";
import { ApiContext } from "./Api"; // Assuming Api.jsx is in the same directory
import { CartContext } from "./CartApi";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems, cartTotal, isLoading } = useContext(CartContext); // Use ApiContext
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    setShouldRender(!shouldRender); // Trigger re-render when user changes
  }, [user, cartItems]);

  return (
    <div className="navbar bg-blue-700">
      {/* Brand/Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-white">
          QwikBuy
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-none">
        <NavigationLinks />
        {/* Conditionally render login/register buttons */}
        {!user && (
          <>
            <Link to="/login" className="btn btn-ghost text-white">
              Login
            </Link>
            <Link to="/register" className="btn btn-ghost text-white">
              Register
            </Link>
          </>
        )}

        {/* Cart Button (conditionally rendered) */}
      {user && (
        <Link to="/cart" className="btn btn-ghost normal-case text-white relative">
          My Cart
          {!isLoading && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {cartItems?.length || 0}
            </span>
          )}
        </Link>
      )}
        {/* Profile Dropdown */}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to="/" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;