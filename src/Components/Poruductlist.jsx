import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Nax from './Nax';
import { getFeaturedProducts, getAllProducts } from './Redux/product';
import Footer from './Footer';

const ProductList = () => {
  const dispatch = useDispatch();
  const { featured, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getFeaturedProducts());
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Nax />

      {/* Hero Section - Featured Product */}
      {featured.length > 0 && (
        <section className="bg-[#ec572f] text-white mx-auto mt-10 max-w-6xl px-4 relative overflow-hidden">
          <div className="px-4 py-12 flex flex-col md:flex-row justify-center items-center relative z-10">
            <div className="md:w-1/2 z-10 md:ml-10">
              <h1 className="text-4xl md:text-5xl font-light mb-8">
                {featured[0].title.split(" ").slice(0, 5).join(" ")}
              </h1>
              <p className="leading-relaxed mb-4 text-white font-semibold text-lg">
                {featured[0].description.substring(0, 150)}...
              </p>
              <Link 
                to={`/product-view/${featured[0]._id}`} 
                className="bg-black text-white font-bold px-5 py-3 text-base tracking-wide inline-block"
              >
                Buy a print
              </Link>
            </div>

            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-end">
              <img
                src={featured[0].image1}
                alt={featured[0].title}
                className="shadow-xl max-w-[300px]"
              />
            </div>
          </div>
          <div className="absolute bottom-[-40px] left-0 w-full h-12 bg-white transform rotate-[-2deg] origin-bottom-left z-0"></div>
        </section>
      )}

      {/* Product List Section */}
      <div className="font-serif bg-white ml-15 mr-15 mt-10 text-black min-h-screen">
        <header className="flex justify-between md:ml-10 items-center px-4 pt-10">
          <h1 className="text-4xl font-medium">Products</h1>
          <nav className="space-x-6 mt-10">
            <a href="#" className="text-[#d35400] font-bold hover:underline">Most Read</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-[#d35400] font-bold hover:underline">Surprise Me</a>
          </nav>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 pt-6">
          {products && products.map((item, index) => (
            <div key={index} className="flex flex-col text-left max-w-md mx-auto">

       <h2 className="text-3xl text-[#e75b1e] font-bold mb-4 leading-snug">
  {item.title.length > 40 ? item.title.substring(0, 20) + "..." : item.title}
</h2>

              <Link to={`/product-view/${item._id}`}>
                <img src={item.image1} alt={item.title} className="w-full h-[300px] object-cover border-4 border-black" />
              </Link>
              <p className="mt-4 text-xl text-left text-gray-900 leading-relaxed">{item.description.substring(0, 100)}...</p>
              <div className="mt-4">
                <Link
                  to={`/product-view/${item._id}`}
                  className="bg-[#e75b1e] text-white font-bold px-6 py-4 mt-8 tracking-wide inline-block"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between mt-20 mb-10 px-4 md:px-10 gap-10">
          {/* Twitter Section */}
          <div className="bg-[#f8f6f1] p-10 flex-1">
            <h3 className="text-3xl font-light mb-4">Twitter</h3>
            <a href="#" className="text-blue-600 underline text-lg">My Tweets</a>
          </div>

          <div className="flex-1">
            <h3 className="text-4xl mb-4 py-2">Letters of Note in your<br /> inbox</h3>
            <div className="bg-[#fef3ea] p-8">
              <div className="text-center">
                <img
                  src="https://substackcdn.com/image/fetch/w_170,c_limit,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f08c121-b0ba-454e-bae3-61c44be6926d_306x306.png"
                  alt="Seal Logo"
                  className="mx-auto mb-2 rounded-xl"
                  style={{ width: 40, height: 40 }}
                />
                <h4 className="text-2xl font-bold underline">Letters of Note</h4>
                <p className="text-sm mt-1 mb-4">
                  Nothing but history's most interesting letters.<br />By Shaun Usher
                </p>
                <div className="flex justify-center flex-wrap">
                  <input
                    type="email"
                    placeholder="Type your email..."
                    className="border border-orange-300 rounded-l-lg px-4 py-2 w-64 text-black"
                  />
                  <button className="bg-[#f26322] text-white px-4 py-2 rounded-r-lg">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs mt-6 text-gray-600">
                  By subscribing you agree to <a href="#" className="underline">Substack's Terms of Use</a>, <a href="#" className="underline">our Privacy Policy</a> and <a href="#" className="underline">our information collection notice</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductList;
