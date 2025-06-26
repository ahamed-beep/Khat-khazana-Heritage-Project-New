import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedProducts } from "../Redux/product";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { featured, loading } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center py-10">Loading featured products...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">🌟 Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featured
          .filter(product => product.featuredproduct === "true") // only featured
          .map(product => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image1}
                alt={product.title}
                className="h-48 w-full object-cover rounded-t-xl"
              />

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <p className="text-indigo-600 font-bold">₹ {product.price}</p>

                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[product.image2, product.image3, product.image4].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`img-${i}`}
                      className="h-16 w-full object-cover rounded"
                    />
                  ))}
                </div>

                <span className="inline-block mt-2 px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                  🌟 Featured
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
