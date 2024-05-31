import { useEffect, useState, createContext } from "react";

const ApiContext = createContext();

function ApiProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <ApiContext.Provider value={{ products, categories, isLoading, error }}>
      {children}
    </ApiContext.Provider>
  );
}

export { ApiContext, ApiProvider }; 