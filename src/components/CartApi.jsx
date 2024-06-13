import { useEffect, useState, createContext, useContext } from "react";
import { AuthContext } from "./Auth";
import { ApiContext } from "./Api"; // Import ApiContext to access products

const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const { products, isLoading: productsLoading } = useContext(ApiContext); // Use ApiContext
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial cart data for the user
  useEffect(() => {
    const fetchUserCart = async () => {
      if (!user) {
        setIsLoading(false); // If not logged in, no cart to load
        return;
      }
      try {
        const response = await fetch(
          `https://fakestoreapi.com/carts/user/${user.id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        // Find the most recent cart
        const mostRecentCart = data.reduce((prev, current) => {
          return new Date(prev.date) > new Date(current.date) ? prev : current;
        }, {});

        setCartItems(mostRecentCart.products || []); // Initialize to empty if no products
        calculateCartTotal(mostRecentCart.products || []);
      } catch (error) {
        console.error("Error fetching user's cart:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCart();
  }, [user, products]); 

  // Calculate cart total
  const calculateCartTotal = (items) => {
    const total = items.reduce(
      (acc, product) => { // Iterate directly over product objects in the cart
        const productDetails = products.find(p => p.id === product.productId);
        return acc + (productDetails?.price || 0) * product.quantity; // Default to 0 if product not found
      },
      0
    );
    setCartTotal(total);
  };

  // Add to cart
  const addToCart = async (product, quantity) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

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

      // Update local cart data (assuming data has the same structure as existing cartItems)
      setCartItems(prevCartItems => [...prevCartItems, data]);
      calculateCartTotal(cartItems); // Update the cart total
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove from cart
  const removeFromCart = async (cartId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCartItems(cartItems.filter((item) => item.id !== cartId));
        calculateCartTotal(cartItems); // Update the cart total
      } else {
        console.error("Error removing from cart:", response.statusText);
      }
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

export { CartContext, CartProvider }