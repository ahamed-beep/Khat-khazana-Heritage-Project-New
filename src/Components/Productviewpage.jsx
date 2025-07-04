import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import Nax from "./Nax";
import toast from "react-hot-toast";
import {
  getAllProducts,
  getProductForRecommendation,
} from "./Redux/product";
import Footer from "./Footer";

const EXCHANGE_RATE = 277;
const convertToUSD = (pkr) => {
  if (!pkr || isNaN(pkr)) return "0.00";
  return (pkr / EXCHANGE_RATE).toFixed(2);
};

const ProductViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { recommendedProduct, products } = useSelector((state) => state.product);
  const product = Array.isArray(recommendedProduct) ? recommendedProduct[0] : {};

  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [currency, setCurrency] = useState("PKR");

  useEffect(() => {
    if (id && id !== "undefined") {
      dispatch(getProductForRecommendation(id));
      dispatch(getAllProducts());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.image1) setMainImage(product.image1);
  }, [product]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);
  }, []);

  const handleAddToCart = () => {
    if (!product || quantity < 1) return;

    const finalPrice =
      currency === "USD"
        ? parseFloat(convertToUSD(product.price || 0))
        : product.price || 0;

    const cartProduct = {
      id: product._id,
      name: product.title,
      price: finalPrice,
      quantity,
      image: mainImage,
    };

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const index = existingCart.findIndex((item) => item.id === cartProduct.id);

    if (index !== -1) {
      existingCart[index].quantity += quantity;
    } else {
      existingCart.push(cartProduct);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    setCartCount(existingCart.reduce((acc, item) => acc + item.quantity, 0));
    toast.success("Product added to cart!");
  };

  if (!product || !product._id) return <div className="text-center py-20">Loading...</div>;

  const formattedPrice = product?.price
    ? currency === "PKR"
      ? `Rs.${product.price.toLocaleString()}`
      : `$${convertToUSD(product.price)}`
    : "Price not available";

  const recommendations = Array.isArray(products)
    ? products.filter((p) => p._id !== product._id).slice(0, 4)
    : [];

  return (
    <div className=" text-gray-800">
      <Nax />

      {/* Header */}
     <div className="absolute top-2 right-5 md:right-4 md:top-41 z-50 flex items-center gap-4 bg-white rounded-full px-3 py-1 shadow border">
          <button
            onClick={() =>
              setCurrency((prev) => (prev === "PKR" ? "USD" : "PKR"))
            }
            className="text-xs font-semibold text-gray-700 hover:text-[#f26322]"
          >
            {currency} ▾
          </button>
          <button onClick={() => navigate("/cart")} className="relative">
            <ShoppingCartIcon className="h-7 w-7 text-gray-800" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      {/* Product Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Left Image Panel */}
        <div className="space-y-4">
          <div className=" rounded-xl overflow-hidden">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-[400px] object-contain"
            />
          </div>
          <div className="flex gap-3 justify-center">
            {[product.image1, product.image2, product.image3, product.image4].map(
              (thumb, index) =>
                thumb && (
                  <img
                    key={index}
                    src={thumb}
                    onClick={() => setMainImage(thumb)}
                    className={`w-20 h-24 object-cover border cursor-pointer rounded-md ${
                      mainImage === thumb ? "border-black" : "border-gray-300"
                    }`}
                    alt={`Thumb ${index + 1}`}
                  />
                )
            )}
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight font-serif">
            {product.title}
          </h1>
          <p className="text-xl font-semibold text-[#e75b1e]">{formattedPrice}</p>
          <p className="text-sm italic text-gray-500">plus postage</p>
          <p className="text-base leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mt-6">
         <input
  type="number"
  value={quantity}
  min={1}
  onChange={(e) =>
    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
  }
  className="border border-gray-400 w-20 px-3 py-2 text-center rounded-md appearance-[textfield]"
  style={{
    WebkitAppearance: 'number-input',
    MozAppearance: 'textfield'
  }}
/>

            <button
              onClick={handleAddToCart}
              className="bg-[#e75b1e] text-white px-6 py-2 rounded-md uppercase font-semibold hover:bg-[#cc4700]"
            >
              Add to Basket
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-2xl font-bold text-center mb-10">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.map((item, idx) => (
            <Link
              key={idx}
              to={`/product-view/${item._id}`}
              className="group block text-center"
            >
              <div className="relative h-[280px] w-full overflow-hidden rounded-lg">
                <img
                  src={item.image1}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                />
                <img
                  src={item.image2 || item.image1}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-base font-semibold text-gray-800 group-hover:underline">
                  {item.title}
                </h3>
                <p className="text-sm font-bold text-gray-700">
                  {item.price
                    ? currency === "PKR"
                      ? `Rs.${Number(item.price).toLocaleString()}`
                      : `$${convertToUSD(item.price)}`
                    : "No price"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductViewPage;