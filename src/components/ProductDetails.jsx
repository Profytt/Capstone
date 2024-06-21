import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ApiContext } from "./Api";
import { CartContext } from "./CartApi";

function ProductDetail() {
  const { products, isLoading, error } = useContext(ApiContext);
  const { addToCart } = useContext(CartContext);
  const { productId } = useParams(); 
  const product = products.find((p) => p.id === Number(productId));

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading product details...</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product, 1); 
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12"> {/* Centered content with padding */}
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row"> {/* Card-like styling */}
        {/* Image */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover rounded-md" 
          />
        </div>

        {/* Details and Actions */}
        <div className="md:w-1/2 flex flex-col justify-between ml-4 md:ml-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <p className="text-2xl text-gray-700">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mt-4">{product.description}</p>
          </div>
          {/* Action Buttons */}
          <div className="mt-6 flex flex-col md:flex-row gap-4"> {/* Responsive button arrangement */}
            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            <Link to="/">
              <button className="btn btn-secondary">Back to Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
