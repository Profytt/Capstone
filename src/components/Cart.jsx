import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartApi";
import { ApiContext } from "./Api";
import { AuthContext } from "./Auth";

function Cart() {
  const { user } = useContext(AuthContext);
  const { products, isLoading } = useContext(ApiContext); // Access products
  const {
    cartItems,
    removeFromCart,
    updateCartItemQuantity,
    cartTotal,
    checkout, // Access checkout from context
  } = useContext(CartContext);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Define handleCheckout within Cart.jsx
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await checkout(); // Call the checkout function from the context
    setIsCheckingOut(false);
  };

  if (!user) {
    return <p className="text-center text-gray-500 mt-10">Please log in to view your cart</p>; // Centered message
  } else if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Loading cart items...</p>;
  } else if (cartItems.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Your Shopping Cart</h1>

      {/* Cart Items Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null; // Skip if product is not found

              return (
                <tr key={item.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={product.image} alt={product.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateCartItemQuantity(item.id, product.id, parseInt(e.target.value, 10))
                      }
                      className="w-16 border rounded"
                    />
                  </td>
                  <td>${(item.quantity * product.price).toFixed(2)}</td>
                  <th>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Order Summary */}
      <div className="mt-8 text-right">
        <p className="text-lg font-semibold">
          Total: ${cartTotal.toFixed(2)}
        </p>
        <button
          className={`btn btn-primary mt-4`}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>

      <Link to="/">
        <button className="btn btn-secondary">Back to Home</button>
      </Link>
    </div>
  );
};

export default Cart;