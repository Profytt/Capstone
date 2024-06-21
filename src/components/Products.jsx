import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "./Api";

function Products() {
  const { products, categories, isLoading, error } = useContext(ApiContext);
  const [sortBy, setSortBy] = useState("title");
  const [showFilterOptions, setShowFilterOptions] = useState(false); 
  const [filterCategory, setFilterCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [searchTerm, setSearchTerm] = useState("");

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading products...</div>;

  
  const filteredProducts = products.filter((product) => {
    const matchesCategory = !filterCategory || product.category === filterCategory;
    const matchesSearch =
      !searchTerm ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const isWithinPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && isWithinPriceRange;
  });

  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price;
    } else {
      return a[sortBy].localeCompare(b[sortBy]);
    }
  });

  
  const productsByCategory = {};
  sortedProducts.forEach((product) => {
    const category = product.category;
    if (!productsByCategory[category]) {
      productsByCategory[category] = [];
    }
    productsByCategory[category].push(product);
  });

  const uniqueCategories = Object.keys(productsByCategory);

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center py-8 text-gray-800">
        Product Catalog
      </h1>

      {/* Filter Button (add some margin and style) */}
      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowFilterOptions(!showFilterOptions)}
        >
          Filter & Sort
        </button>
      </div>

      {showFilterOptions && (
        <div className="filters mb-4 flex flex-wrap justify-center gap-4">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <label htmlFor="category" className="block mb-2">
              Category:
            </label>
            <select
              id="category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <label htmlFor="priceRange" className="block mb-2">
              Price Range:
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                id="minPrice"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                id="maxPrice"
                placeholder="Max"
                value={priceRange[1] === Infinity ? "" : priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    e.target.value ? Number(e.target.value) : Infinity,
                  ])
                }
                className="w-1/2 p-2 border rounded"
              />
            </div>
          </div>

          {/* Search */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <label htmlFor="search" className="block mb-2">
              Search:
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Sort By */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <label htmlFor="sort" className="block mb-2">
              Sort By:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="title">Name</option>
              <option value="price">Price (Low to High)</option>
            </select>
          </div>
        </div>
      )}

      {/* Product Display */}
      <div className="container mx-auto">
        {/* Map over unique categories */}
        {uniqueCategories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-medium text-gray-700 mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {productsByCategory[category].map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="transform hover:scale-105 transition duration-300">
                  <div className="card card-compact bg-white rounded-lg shadow-md overflow-hidden"> {/* White rounded card with shadow */}
                    <figure>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover" 
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title text-gray-900">{product.title}</h2>
                      <p className="text-gray-700 mt-2">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;