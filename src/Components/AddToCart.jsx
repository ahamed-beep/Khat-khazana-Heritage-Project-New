import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Nax from "./Nax";
import Footer from "./Footer";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currency, setCurrency] = useState("PKR");
  const [exchangeRate] = useState(280);
  const [editModes, setEditModes] = useState({});
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, []);

  const getTotal = () => {
    const totalPKR = cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
    return currency === "USD"
      ? (totalPKR / exchangeRate).toFixed(2)
      : totalPKR.toLocaleString();
  };

  const formatPrice = (price) => {
    return currency === "USD"
      ? `$${(price / exchangeRate).toFixed(2)}`
      : `Rs.${price.toLocaleString()}`;
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const toggleEditMode = (index) => {
    setEditModes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleRemove = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    setEditModes((prev) => {
      const newModes = { ...prev };
      delete newModes[index];
      return newModes;
    });
  };

  const handleQuantityChange = (index, value) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = parseInt(value) || 1;
    setCartItems(updatedItems);
  };

  const handleUpdate = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <div>

  <Nax/>
    <div className="min-h-screen px-4 py-10 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto relative">
        {/* Currency Button - Top Right */}
        <div className="absolute right-0 top-0">
          <button
            onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
            className="px-2 py-1 text-sm border border-gray-300 text-[#f26322] rounded hover:bg-orange-100"
            title="Change currency"
          >
            {currency}
          </button>
          {showCurrencyMenu && (
            <div className="mt-2 right-0 bg-white border border-gray-200 rounded shadow text-sm absolute z-10">
              <button
                onClick={() => {
                  setCurrency("PKR");
                  setShowCurrencyMenu(false);
                }}
                className={`block w-full px-3 py-1 text-left hover:bg-orange-100 ${
                  currency === "PKR" ? "bg-orange-100 font-semibold" : ""
                }`}
              >
                PKR
              </button>
              <button
                onClick={() => {
                  setCurrency("USD");
                  setShowCurrencyMenu(false);
                }}
                className={`block w-full px-3 py-1 text-left hover:bg-orange-100 ${
                  currency === "USD" ? "bg-orange-100 font-semibold" : ""
                }`}
              >
                USD
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-10">Your basket</h1>

        {/* Continue Shopping Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/productview")}
            className="text-[#f26322] hover:underline text-sm font-medium"
          >
            Continue shopping
          </button>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden sm:block w-full overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-6">
                <thead>
                  <tr className="text-gray-600 text-sm">
                    <th className="w-1/3">Product</th>
                    <th className="w-1/6">Price</th>
                    <th className="w-1/6">Quantity</th>
                    <th className="w-1/6">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.id || item.name}>
                      <td className="flex items-start gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-28 object-cover border"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <button
                            onClick={() => handleRemove(index)}
                            className="text-[#f26322] text-sm underline mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="align-top pt-2">{formatPrice(item.price)}</td>
                      <td className="align-top pt-2">
                        <input
                          type="number"
                          value={item.quantity || 1}
                          min="1"
                          className="w-14 border border-gray-300 px-2 py-1 text-center"
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                        />
                      </td>
                      <td className="align-top pt-2 font-medium">
                        {formatPrice(item.price * (item.quantity || 1))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="sm:hidden space-y-10">
              {cartItems.map((item, index) => (
                <div key={index} className="border-b pb-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-28 object-cover border"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="font-semibold">{formatPrice(item.price)}</span>
                        <button
                          onClick={() => toggleEditMode(index)}
                          className="px-3 py-1 border border-[#f26322] text-[#f26322] text-sm rounded hover:bg-orange-50"
                        >
                          {editModes[index] ? "CANCEL" : "EDIT"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {editModes[index] && (
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => handleRemove(index)}
                        className="text-[#f26322] text-sm underline"
                      >
                        Remove
                      </button>
                      <div className="flex items-center gap-2">
                        <label className="text-sm">Quantity:</label>
                        <input
                          type="number"
                          value={item.quantity || 1}
                          min="1"
                          className="w-16 border border-gray-300 px-2 py-1 text-center"
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                        />
                      </div>
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-1 bg-[#f26322] text-white rounded text-sm hover:bg-[#e35412]"
                      >
                        UPDATE
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Totals & Actions */}
            <div className="text-right mt-10 space-y-2">
              <p className="text-lg font-semibold">
                Subtotal:{" "}
                {currency === "USD" ? `$${getTotal()}` : `Rs.${getTotal()}`}
              </p>
              <p className="text-sm text-gray-500">
                Postage calculated at checkout
              </p>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleUpdate}
                  className="px-6 py-2 border border-[#f26322] text-[#f26322] hover:bg-orange-50 font-semibold rounded"
                >
                  Update
                </button>
                <button
                  onClick={handleCheckout}
                  className="px-6 py-2 bg-[#f26322] text-white hover:bg-[#e35412] font-semibold rounded"
                >
                  Check Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    <Footer/>
      </div>
  );
};

export default AddToCart;

