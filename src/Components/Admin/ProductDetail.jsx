import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductById, getProductById } from "../Redux/product";
import { useParams, useNavigate } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (loading || !product) {
    return <p className="text-center py-10">Loading product...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-xl font-bold text-indigo-600">Product Details</h1>

      <p><span className="font-semibold">Title:</span> {product.title}</p>
      <p><span className="font-semibold">Price:</span> {product.price}</p>
      <p><span className="font-semibold">Description:</span> {product.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <img src={product.image1} alt="image1" className="h-32 w-full object-cover rounded" />
        <img src={product.image2} alt="image2" className="h-32 w-full object-cover rounded" />
        <img src={product.image3} alt="image3" className="h-32 w-full object-cover rounded" />
        <img src={product.image4} alt="image4" className="h-32 w-full object-cover rounded" />
      </div>
         <p>Featured Letter: {product.featuredproduct}</p>

      <button
        onClick={() => navigate(`/product/update/${product._id}`)}
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mt-4"
      >
        Edit Product
      </button>
      <button
  onClick={() => dispatch(deleteProductById(product._id))}
  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 ml-2"
>
  Delete
</button>
    </div>
  );
};

export default ProductDetail;
