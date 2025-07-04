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
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    message: "",
    subscribe: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(contactsubmitdata(formData));
  };

  return (
    <div className="bg-[#fdf8f3] font-serif text-[#333333]">
      <Nax />

      {/* Hero Section */}
      <div
        className="w-full h-[500px] bg-cover bg-center flex items-center justify-center"
       
                   style={{
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://thomasthailand.co/wp-content/uploads/2022/02/AW-Valentine-04-scaled.jpg')`,
  }}
      >
        <h1 className="text-5xl font-bold uppercase tracking-widest text-white drop-shadow-lg  px-6 py-2 rounded">
          Contact Us
        </h1>
      </div>

      {/* Contact Info + Form Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-[#e75b1e]">
            How to Contact Us
          </h2>
          <p className="text-[#555555] leading-relaxed">
            We welcome your questions, comments, and feedback. Please choose a way
            to get in touch or fill out the form.
          </p>
          <div className="space-y-4 text-sm leading-loose">
            <p>
              <span className="font-semibold text-[#e75b1e]">General Email:</span><br />
              <a href="mailto:info@oldfonts.com" className="hover:text-black transition">khatkhazana@25heritage.com</a>
            </p>
            <p>
              <span className="font-semibold text-[#e75b1e]">Email Brian Willson directly:</span><br />
              <a href="mailto:willson@3ip.com" className="hover:text-black transition">khatkhazana@3zip.com</a>
            </p>
            <p>
              <span className="font-semibold text-[#e75b1e]">By Phone:</span><br />
              (030) 675-1718
            </p>
            <p>
              <span className="font-semibold text-[#e75b1e]">By Snailmail:</span><br />
              khat khazana.com, c/o Zip<br />
              P.O. Box 9877<br />
              Khat khazana me 03000-1819 US
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#fcf5eb] border border-[#e7ddd0] rounded-xl shadow-md p-8">
          <h2 className="text-xl font-bold uppercase tracking-wide mb-6 text-center text-[#e75b1e]">
            Send a Message
          </h2>

          {/* Alerts */}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="* Name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 border border-[#e7ddd0] px-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e75b1e]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="* Email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 border border-[#e7ddd0] px-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e75b1e]"
              />
            </div>

            {/* Address */}
            <input
              type="text"
              name="address"
              required
              placeholder="* Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-[#e7ddd0] px-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e75b1e]"
            />

            {/* City, State, Zip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                required
                placeholder="* City"
                value={formData.city}
                onChange={handleChange}
                className="border border-[#e7ddd0] px-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e75b1e]"
              />
              <input
                type="text"
                name="state"
                required
                placeholder="* State"
                value={formData.state}
                onChange={handleChange}
                className="border border-[#e7ddd0] px-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e75b1e]"
              />
              <input
                type="text"
                name="zip"
                required
                placeholder="* Zip"
                value={formData.zip}
                onChange={handleChange}
                className="border border-[#e7ddd0] px-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e75b1e]"
              />
            </div>

            {/* Country + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="border border-[#e7ddd0] px-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e75b1e]"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-[#e7ddd0] px-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e75b1e]"
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-start space-x-2 text-sm text-[#555555]">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
                className="mt-1"
              />
              <span>Yes, please put me on your email list! <br />(We'll never share your email address with anyone.)</span>
            </label>

            {/* Message */}
            <textarea
              name="message"
              rows="5"
              placeholder="Your message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-[#e7ddd0] px-4 py-3 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e75b1e]"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 ${
                loading ? "bg-gray-400" : "bg-[#e75b1e] hover:bg-[#c44c14]"
              } text-white text-base font-semibold uppercase tracking-wide rounded-md transition-colors duration-300`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contactus;
