import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  whileHover: {
    scale: 1.03,
    boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)",
    y: -5,
    transition: { type: "spring", stiffness: 250, damping: 20 },
  },
};

const Category = () => {
  return (
    <div className="bg-white flex flex-col items-center py-8">
      <h1 className="text-3xl font-semibold text-black mb-6">
        Explore Collections
      </h1>

      {/* ====== Letter cards ====== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl px-4">
        {/* Urdu Letters */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center transition hover:shadow-md">
          <h2 className="text-xl font-semibold text-black mb-2">Urdu Letters</h2>
          <p className="text-gray-600 mb-4 text-center">
            Historical correspondence in Urdu script
          </p>
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
            Browse Collection
          </button>
        </div>

        {/* Punjabi Letters */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center transition hover:shadow-md">
          <h2 className="text-xl font-semibold text-black mb-2">
            ਪੰਜਾਬੀ ਚਿੱਠੀਆਂ
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            Historical correspondence in Punjabi script
          </p>
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
            Browse Collection
          </button>
        </div>
      </div>

      {/* ====== Image & Video section ====== */}
      <div className="max-w-6xl mx-auto px-6 py-16 bg-gray-50 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image card */}
          <motion.div
            {...fadeUp}
            className="relative cursor-pointer rounded-3xl overflow-hidden shadow-lg bg-white"
          >
            {/* icon hataya */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ehR4WLF2Pflw_NeZ8wqgQs6NrE5yW8BCaQ&s"
              alt="Stylish"
              className="w-full h-[450px] object-cover rounded-3xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
              className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-pink-400 pointer-events-none rounded-3xl"
            />
          </motion.div>

          {/* Video card */}
          <motion.div
            {...fadeUp}
            className="relative cursor-pointer rounded-3xl overflow-hidden shadow-lg bg-white flex flex-col"
          >
            {/* icon hataya */}
            <video
              controls
              className="w-full h-[450px] object-cover rounded-3xl"
              src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/GTYSdDW/couple-spinning-trick-in-vaudeville-show_-ypd_jjgs__3cc9725a51f6f553a9e6b295917a64bb__P360.mp4"
            >
              Your browser does not support the video tag.
            </video>
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
              className="absolute inset-0 bg-gradient-to-tr from-pink-400 to-yellow-400 pointer-events-none rounded-3xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Category;
