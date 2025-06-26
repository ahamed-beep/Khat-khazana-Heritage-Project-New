import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactsubmitdata } from "./Redux/contact";
import Nax from "./Nax";
import Footer from "./Footer";

const Contactus = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(contactsubmitdata(formData));
  };

  return (
    <div>
      <Nax />

      {/* Contact Form Section */}
      <div className=" py-20 px-4 min-h-screen flex justify-center">
        <div className="w-full max-w-[700px] bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-8 text-center text-[#B98940]">
            Get In Touch
          </h1>

          {/* Error Message */}
          {error && (
            <div className="mb-6 text-red-800 bg-red-100 border border-red-300 px-4 py-3 rounded text-center text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 text-green-800 bg-green-100 border border-green-300 px-4 py-3 rounded text-center text-sm">
              Your message has been successfully sent.
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
                className="flex-1 border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B98940] text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                value={formData.email}
                onChange={handleChange}
                className="flex-1 border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B98940] text-sm"
              />
            </div>

            <textarea
              name="message"
              placeholder="Your message"
              rows="8"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B98940] text-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 ${
                loading ? "bg-gray-500" : "bg-[#B98940] hover:bg-[#A17436]"
              } text-white text-base font-semibold uppercase tracking-wide rounded-md transition-colors duration-300`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contactus;
