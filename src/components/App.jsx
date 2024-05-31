import React, { useEffect, useState } from 'react';

const App = () => {
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
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // (For now, we're just logging the data to the console)
  console.log('Products:', products);
  console.log('Categories:', categories);
  console.log('isLoading:', isLoading);
  console.log('Error:', error);

  return (
    <div>
      {isLoading ? <p>Loading products...</p> : <p>Products loaded!</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default App;
