import { useEffect, useState, createContext, useContext } from "react";
import { AuthContext } from "./Auth";
import { ApiContext } from "./Api";

const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const { products, isLoading } = useContext(ApiContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [error, setError] = useState(null);

  // Fetch initial cart data for the user
  useEffect(() => {
    const fetchUserCart = async () => {
        if (user) {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/carts/user/${user.id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        
        const data = await response.json();
        setCartItems(data);
        calculateCartTotal(data); // Calculate total when cart data is updated
      } catch (error) {
        console.error("Error fetching user's cart:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
     //Only fetch cart if user is logged in
      fetchUserCart();
    }
  }, [user]);

  // Calculate cart total
  const calculateCartTotal = (items) => {
    const total = items.reduce(
      (acc, cart) => {
        return acc + cart.products.reduce((total, product) => {
          return total + product.quantity * products.find(p => p.id === product.productId).price;
        }, 0);
      },
      0
    );
    setCartTotal(total);
  };

  // Add to cart
  const addToCart = async (product, quantity) => {
    try {
      const response = await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          date: new Date().toISOString().slice(0, 10),
          products: [{ productId: product.id, quantity }],
        }),
      });
      const data = await response.json();

      // Update local cart data 
      setCartItems(prevCartItems => {
        const existingIndex = prevCartItems.findIndex(item => item.id === data.id);
        if (existingIndex !== -1) {
          // Update the quantity if the item is already in the cart
          const updatedItems = [...prevCartItems];
          updatedItems[existingIndex] = data;
          return updatedItems;
        } else {
          // Add the new item to the cart
          return [...prevCartItems, data];
        }
      });
      calculateCartTotal(cartItems); // Update the cart total
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove from cart
  const removeFromCart = async (cartId) => {
    try {
      await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: "DELETE",
      });
      setCartItems(cartItems.filter(item => item.id !== cartId));
      calculateCartTotal(cartItems); // Update the cart total
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Update cart item quantity
  const updateCartItemQuantity = async (cartId, productId, newQuantity) => {
    try {
      const cartToUpdate = cartItems.find(item => item.id === cartId);
      const updatedProducts = cartToUpdate.products.map(product =>
        product.productId === productId ? { ...product, quantity: newQuantity } : product
      );

      const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: "PUT",
        body: JSON.stringify({
          userId: user.id,
          date: new Date().toISOString().slice(0, 10),
          products: updatedProducts,
        }),
      });
      const data = await response.json();

      // Update local cart data
      setCartItems(cartItems.map(item => (item.id === cartId ? data : item)));
      calculateCartTotal(cartItems); // Update the cart total
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };