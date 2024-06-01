import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ApiContext } from "./Api.jsx";

function ProductDetail() {
  const { products, isLoading, error } = useContext(ApiContext);
  const { productId } = useParams();
  const product = products.find((p) => p.id === Number(productId));

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading product details...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto mt-10">
  <div className="flex flex-col md:flex-row gap-8"> {/* Main container: flexbox */}
    {/* Product Image */}
    <div className="relative h-48"> {/* Image container */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-md object-contain rounded-lg mb-4"
      />
    </div>

    {/* Product Details and Actions */}
    <div className="md:w-1/2 flex flex-col justify-between"> {/* Details/actions container */}
      {/* Product Details */}
      <div>
        <h1 className="text-5xl font-bold mb-2">{product.title}</h1>
        <p className="text-white text-3xl mb-4">${product.price}</p>
        <p className="text-white text-2xl">{product.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4"> 
        <button className="btn btn-primary mb-2">Add to Cart</button>
        <button className="btn btn-secondary">Buy Now</button>
      </div>
    </div>
  </div>
</div>
  );
}

export default ProductDetail;
