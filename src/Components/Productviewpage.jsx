import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import Nax from './Nax';
import toast from 'react-hot-toast';
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

  const { recommendedProduct, products } = useSelector(
    (state) => state.product
  );

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

  if (!product || !product._id) return <div>Loading...</div>;

  const formattedPrice = product?.price
    ? currency === "PKR"
      ? `Rs.${product.price.toLocaleString()}`
      : `$${convertToUSD(product.price)}`
    : "Price not available";

  const recommendations = Array.isArray(products)
    ? products.filter((p) => p._id !== product._id).slice(0, 4)
    : [];

  return (
    <div>
      <Nax />
      <div className="relative font-sans bg-white text-black min-h-screen px-4 py-10 md:px-20 md:py-16">
        {/* Cart & Currency */}
        <div className="absolute top-2 right-5 md:right-4 md:top-10 z-50 flex items-center gap-4 bg-white rounded-full px-3 py-1 shadow border">
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

        {/* Product Details */}
        <div className="flex flex-col md:flex-row gap-10 mt-10">
          {/* Images */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <img
              src={mainImage}
              alt={product.title}
              className="max-w-full h-[400px] object-contain border mb-4"
            />
            <div className="flex gap-3 mt-2">
              {[product.image1, product.image2, product.image3, product.image4].map(
                (thumb, index) =>
                  thumb && (
                    <img
                      key={index}
                      src={thumb}
                      onClick={() => setMainImage(thumb)}
                      className={`w-20 h-24 object-cover border cursor-pointer ${
                        mainImage === thumb
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      alt={`Thumb ${index + 1}`}
                    />
                  )
              )}
            </div>
          </div>

          {/* Text Info */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
              {product.title}
            </h1>
            <p className="text-xl font-bold">{formattedPrice}</p>
            <p className="text-gray-500 text-sm">plus postage</p>

            <div className="flex items-center gap-4">
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="border border-gray-300 w-16 px-3 py-2 text-center rounded"
              />
              <button
                onClick={handleAddToCart}
                className="bg-[#f26322] text-white font-semibold px-6 py-2 uppercase tracking-wider"
              >
                Add to Basket
              </button>
            </div>

            <p className="text-base">{product.description}</p>
          </div>
        </div>

        {/* Section 1: You may also like (from all products) */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((item, idx) => (
              <Link
                key={idx}
                to={`/product-view/${item._id}`}
                className="text-center"
              >
                <img
                  src={item.image1}
                  alt={item.title}
                  className="w-full h-[280px] object-cover mb-3"
                />
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="text-sm font-bold text-gray-700">
                  {item.price
                    ? currency === "PKR"
                      ? `Rs.${Number(item.price).toLocaleString()}`
                      : `$${convertToUSD(item.price)}`
                    : "No price"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductViewPage;
