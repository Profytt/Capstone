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
    <div>
      <h1>Product Catalog</h1>

      
      <button
        className="btn btn-secondary"
        onClick={() => setShowFilterOptions(!showFilterOptions)}
      >
        Sort & Filter
      </button>

      
      {showFilterOptions && ( 
        <div className="filters mb-4 flex flex-wrap gap-4">
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
      <div className="container mx-auto23">
        {uniqueCategories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productsByCategory[category].map((product) => (
                <div
                  key={product.id}
                  className="card card-compact bg-yellow-100 shadow-xl cursor-pointer"
                >
                  <figure className="relative h-48">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-contain rounded-t-lg mb-2"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{product.title}</h2>
                    <p>Price: ${product.price}</p>
                    <div className="card-actions justify-end">
                      <Link to={`/product/${product.id}`}>
                        <button className="btn btn-primary">View Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;