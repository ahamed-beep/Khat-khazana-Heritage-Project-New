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
    <div className=" font-serif text-[#5c4634]">
      <Nax />

      <div className="py-20 px-4 min-h-screen flex justify-center items-start">
        <div className="w-full max-w-[720px] bg-[#fff9ef] border border-[#c7a87d] rounded-lg shadow-lg px-8 py-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-center text-[#8B5E3C] mb-10">
            Write To Us
          </h1>

          {/* Border Decoration */}
          <div className="absolute top-0 left-0 w-full h-2 border-t-4 border-double border-[#d3af85]" />

          {error && (
            <div className="mb-6 text-red-800 bg-red-100 border border-red-300 px-4 py-3 rounded text-center text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 text-green-800 bg-green-100 border border-green-300 px-4 py-3 rounded text-center text-sm">
              Your message has been successfully sent.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="flex-1 px-5 py-3 border border-[#d9c0a6] rounded bg-[#fffaf2] text-sm placeholder:text-[#8b735c] focus:outline-none focus:ring-2 focus:ring-[#c9a36d]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="flex-1 px-5 py-3 border border-[#d9c0a6] rounded bg-[#fffaf2] text-sm placeholder:text-[#8b735c] focus:outline-none focus:ring-2 focus:ring-[#c9a36d]"
              />
            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              rows="7"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-[#d9c0a6] rounded bg-[#fffaf2] text-sm placeholder:text-[#8b735c] focus:outline-none focus:ring-2 focus:ring-[#c9a36d]"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 rounded uppercase font-bold tracking-widest text-white text-sm transition-colors ${
                loading
                  ? "bg-[#c0a77e] cursor-not-allowed"
                  : "bg-[#8B5E3C] hover:bg-[#7a5134]"
              }`}
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
