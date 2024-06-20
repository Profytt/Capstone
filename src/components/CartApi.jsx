import React, { useEffect, useState, createContext } from 'react';
import useLocalStorage from '../useLocalStorage';

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Calculate the total price whenever the cart items change
    const calculateTotal = () => {
      const total = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity; // Assuming your cart item structure
      }, 0);
      setCartTotal(total);
    };

    calculateTotal();
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => prevItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const checkout = () => {
    // This function would typically handle sending the order to a backend
    console.log("Checking out with items:", cartItems);
    // After checkout, you'd likely clear the cart here
    setCartItems([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        cartTotal, 
        addToCart, 
        removeFromCart, 
        updateCartItemQuantity,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };