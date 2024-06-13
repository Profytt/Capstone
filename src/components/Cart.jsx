import React, { useContext } from "react";
import { ApiContext } from "./Api";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateCartItemQuantity } =
    useContext(ApiContext);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
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
                  <button
                    className="btn btn-error btn-sm mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                  {/* Add logic for updating quantity here */}
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xl font-semibold">Total: ${cartTotal.toFixed(2)}</p>
          <button className="btn btn-primary mt-4">Proceed to Checkout</button>
        </div>
      )}
      <Link to="/">
        <button className="btn btn-secondary">Back to Home</button>
      </Link>
    </div>
  );
}

export default Cart;