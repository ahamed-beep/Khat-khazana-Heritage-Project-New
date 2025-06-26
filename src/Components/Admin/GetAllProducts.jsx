import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/product";
import { useNavigate } from "react-router";

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-indigo-600">All Products</h1>
      {products.map(product => (
        <div
          key={product._id}
          className="border rounded-lg p-4 shadow hover:shadow-md transition space-y-2"
        >
          <h2 className="font-semibold">{product.title}</h2>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <img src={product.image1} alt="img1" className="h-24 object-cover rounded" />
            <img src={product.image2} alt="img2" className="h-24 object-cover rounded" />
            <img src={product.image3} alt="img3" className="h-24 object-cover rounded" />
            <img src={product.image4} alt="img4" className="h-24 object-cover rounded" />
          </div>
         <p>Featured Letter: {product.featuredproduct}</p>
          <div className="mt-3">
            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
            >
              View Detail
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
