import React, { useContext } from "react";
import { CartContext } from "./CartApi";
import { Link } from "react-router-dom";
import { ApiContext } from "./Api";
import { AuthContext } from "./Auth";

function Cart() {
  const { user } = useContext(AuthContext);
  const { products, isLoading } = useContext(ApiContext); // Access products and isLoading
  const { cartItems, removeFromCart, updateCartItemQuantity, cartTotal } =
    useContext(CartContext);

    if (!user) {
      return <p>Please log in to view your cart</p>;
    } else if (isLoading) {
      return <p>Loading cart items...</p>; // Show loading message while products are being fetched
    } else if (cartItems.length === 0) {
      return <p>Your cart is empty.</p>;
    }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <ul> 
        {cartItems.map((item) => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return null; // Skip if product is not found
          return (
            <li key={item.id} className="flex items-center mb-4">
              {/* Assuming each cart item has a `product` property with image and title */}
              <img
                src={products.find((p) => p.id === item.productId)?.image}
                alt={products.find((p) => p.id === item.productId)?.title}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-medium">
                  {products.find((p) => p.id === item.productId)?.title}
                </h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">
                  $
                  {(
                    item.quantity *
                    products.find((p) => p.id === item.productId)?.price
                  ).toFixed(2)}
                </p>
                <button className="btn btn-error btn-sm mt-2" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
                {/* Add logic for updating quantity here */}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="text-xl font-semibold">Total: ${cartTotal.toFixed(2)}</p>
      <Link to="/">
        <button className="btn btn-secondary">Back to Home</button>
      </Link>
    </div>
  );
}

export default Cart;