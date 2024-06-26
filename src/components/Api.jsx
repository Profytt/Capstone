import { useEffect, useState, createContext } from 'react';

const ApiContext = createContext();

function ApiProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err); 
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err);
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