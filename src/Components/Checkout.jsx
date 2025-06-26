import React, { useEffect, useState } from "react";
import Nax from "./Nax";
import Footer from "./Footer";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("dpd");
  const [subscribe, setSubscribe] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, []);

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>

  <Nax/>
    <div className="min-h-screen bg-white p-6 md:p-10 text-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row rounded-2xl overflow-hidden relative">
        {/* Left Panel (Form) */}
        <div className="w-full lg:w-1/2 p-8 overflow-y-auto bg-white">
          <h2 className="text-2xl font-semibold text-[#f26322] mb-6">Contact</h2>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
            />
          </div>
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={subscribe}
                onChange={() => setSubscribe(!subscribe)}
                className="accent-[#f26322]"
              />
              Email me with news and offers
            </label>
          </div>

          <h2 className="text-2xl font-semibold text-[#f26322] mb-6">Delivery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]">
              <option>Pakistan</option>
              <option>India</option>
              <option>USA</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
          />
          <input
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            className="w-full mb-4 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="City"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
            />
            <input
              type="text"
              placeholder="Postal code"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
            />
          </div>

          <h2 className="text-2xl font-semibold text-[#f26322] mt-10 mb-4">Shipping Method</h2>
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <span>DPD</span>
            <span className="text-[#f26322] font-semibold">Rs.11000</span>
          </div>

          <h2 className="text-2xl font-semibold text-[#f26322] mt-10 mb-2">Payment</h2>
          <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
            />
            <input
              type="text"
              placeholder="Name on card"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
            />
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
            />
            <input
              type="password"
              placeholder="CVV"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f26322]"
            />
          </div>

          <button className="mt-8 w-full bg-[#f26322] hover:bg-[#e35412] text-white py-3 rounded-xl text-lg font-semibold transition duration-200 shadow-md hover:shadow-lg">
            Proceed to Checkout
          </button>

          <p className="text-xs text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <span className="text-[#f26322] cursor-pointer hover:underline">Login</span>
          </p>
        </div>

        {/* Center Divider */}
        <div className="hidden lg:block w-px bg-gray-300"></div>

        {/* Right Panel (Sticky Product Summary at same position) */}
        <div className="w-full lg:w-1/2 bg-gray-100 p-8">
          <div className="sticky top-24">
            <h2 className="text-2xl font-semibold mb-6 text-[#f26322]">Your Order</h2>
            <div className="space-y-5 max-h-[450px] overflow-y-auto pr-2">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl shadow border"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="font-semibold text-[#f26322] text-sm">
                      Rs.{item.price * item.quantity}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No items in cart.</p>
              )}
            </div>
            <div className="mt-8 pt-4 text-lg font-bold flex justify-between border-t border-gray-200">
              <p>Total</p>
              <p className="text-[#f26322]">
                Rs.{getTotal() + (shippingMethod === "dpd" ? 250 : 0)}
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

export default Checkout;
