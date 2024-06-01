import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "./Api";

function Products() {
  const { products, isLoading, error } = useContext(ApiContext);
  const productsByCategory = {};

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading products...</div>;

  products.forEach((product) => {
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

      <div className="container mx-auto">
        {uniqueCategories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productsByCategory[category].map((product) => (
                <div
                  key={product.id}
                  className="card card-compact bg-base-100 shadow-xl cursor-pointer"
                >
                  <figure className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-t-lg mb-2"
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