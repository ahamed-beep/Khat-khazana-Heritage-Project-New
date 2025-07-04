import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Nax from './Nax';
import Footer from './Footer';
import { getFeaturedProducts, getAllProducts } from './Redux/product';

const ProductList = () => {
  const dispatch = useDispatch();
  const { featured, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getFeaturedProducts());
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="bg-white text-black font-serif">
      <Nax />

    {featured.length > 0 && (
  <section className="bg-[#fef3ea] text-black py-16 md:ml-20 md:mr-20 px-6 md:px-20">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
      
      {/* Product Image */}
      <div className="flex justify-center md:justify-start">
        <img
          src={featured[0].image1}
          alt={featured[0].title}
          className="rounded-xl shadow-2xl w-full max-w-sm border-4 border-black"
        />
      </div>

      {/* Product Info */}
      <div className="text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
          {featured[0].title}
        </h1>
        <p className="text-lg text-gray-700 mb-2 italic">
          Rs. {featured[0].price?.toLocaleString() || '—'}
        </p>
        <p className="text-gray-800 text-base leading-relaxed mb-6">
          {featured[0].description.substring(0, 200)}...
        </p>
        <Link
          to={`/product-view/${featured[0]._id}`}
          className="inline-block bg-[#e75b1e] text-white font-semibold px-6 py-3 rounded shadow hover:bg-[#d35400] transition"
        >
          View Product
        </Link>
      </div>
    </div>
  </section>
)}



      {/* PRODUCT GRID */}
   <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
  <div className="flex justify-between items-center mb-10">
    <h2 className="text-3xl md:text-4xl font-semibold">PRODUCTS</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {products.map((item, index) => (
      <div
        key={index}
        className="bg-[#fef3ea] rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
      >
       <Link to={`/product-view/${item._id}`} className="group relative block h-[260px] w-full overflow-hidden border-b-4 border-black">
  {/* Default Image */}
  <img
    src={item.image1}
    alt={item.title}
    className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition duration-500"
  />

  {/* Hover Image */}
  <img
    src={item.image2 || item.image1}
    alt={`${item.title} alt`}
    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
  />
</Link>

        <div className="p-6">
          <h3 className="text-2xl text-[#e75b1e] font-bold mb-2">
            {item.title.length > 40 ? item.title.substring(0, 20) + "..." : item.title}
          </h3>

          <p className="text-gray-800 mb-2">
            {item.description.substring(0, 100)}...
          </p>

          {/* ✅ PRICE */}
          <p className="text-lg font-semibold text-[#444] mb-1">
            Rs. {item.price?.toLocaleString() || '—'}
          </p>

          <p className="text-sm italic text-gray-600">
            Originally archived in {item.year || 'unknown year'}.
          </p>

          <Link
            to={`/product-view/${item._id}`}
            className="inline-block bg-[#e75b1e] text-white mt-4 px-4 py-2 rounded-md font-medium"
          >
            View Product
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* QUOTE SECTION */}
      <section className="bg-[#f8f6f1] py-14 px-6 text-center text-xl italic text-gray-700 tracking-wide">
        “Time doesn’t erase stories — it hides them. Until we bring them back.”
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="bg-white py-16 px-6 md:px-20 text-center">
        <h3 className="text-3xl font-semibold mb-10">What People Are Saying</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <blockquote className="bg-[#fef3ea] p-6 rounded-lg shadow">
            <p>“The print quality is stunning. I gifted one to my grandfather — he cried reading it.”</p>
            <footer className="mt-4 text-sm text-gray-600">— Sara A.</footer>
          </blockquote>
          <blockquote className="bg-[#fef3ea] p-6 rounded-lg shadow">
            <p>“Feels like holding a piece of history. The packaging was also beautiful.”</p>
            <footer className="mt-4 text-sm text-gray-600">— Imran K.</footer>
          </blockquote>
          <blockquote className="bg-[#fef3ea] p-6 rounded-lg shadow">
            <p>“I’ve never seen anything like this before — so personal and poetic.”</p>
            <footer className="mt-4 text-sm text-gray-600">— Anam R.</footer>
          </blockquote>
        </div>
      </section>

      {/* SUBSCRIBE SECTION */}
      <section className="bg-[#fef3ea] py-16 px-6 md:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="https://substackcdn.com/image/fetch/w_170,c_limit,f_auto,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f08c121-b0ba-454e-bae3-61c44be6926d_306x306.png"
            alt="Seal Logo"
            className="mx-auto mb-4 w-10 h-10 rounded-full"
          />
          <h4 className="text-2xl font-bold underline">Khat-Khazana-Heritage</h4>
          <p className="text-sm mt-2 mb-4">
            Nothing but history's most interesting letters. By Shaun Usher
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <input
              type="email"
              placeholder="Type your email..."
              className="border border-orange-300 rounded-l px-4 py-2 w-64 text-black"
            />
            <button className="bg-[#f26322] text-white px-4 py-2 rounded-r">Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductList;
