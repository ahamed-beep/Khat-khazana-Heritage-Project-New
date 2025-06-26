import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signinuser, googlelogin } from "./Redux/user";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Nax from "./Nax";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    contactnumber: "",
    address: "",
    country: "",
    role: "user",
    status: "null",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await dispatch(signinuser(formData)).unwrap();
      toast.success("Signup successful!");
      navigate("/log");
    } catch (err) {
      toast.error(err.message || "Signup failed!");
      console.error("❌ Signup Error:", err);
    }

    setLoading(false);
  };

  const handleCredentialResponse = async (response) => {
    try {
      const res = await dispatch(googlelogin({ credential: response.credential }));

      if (res.meta.requestStatus === "fulfilled") {
        localStorage.setItem('token', res.payload.token);
        toast.success("Google Sign-Up successful!");
        navigate('/user');
      } else {
        toast.error(res.payload || "Google Sign-Up failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Authentication failed. Please try again.");
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "371076891085-5op51naiscmt9ibv0uhsfcvf5qrjgm31.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignUpDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex justify-center mt-25 items-center">
      <Nax />
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Signup</h2>

        <form onSubmit={formHandler} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required className="col-span-1 border border-gray-300 px-4 py-2 rounded-full text-gray-800" />
            <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required className="col-span-1 border border-gray-300 px-4 py-2 rounded-full text-gray-800" />
          </div>

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded-full text-gray-800" />

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded-full text-gray-800" />

          <input type="password" name="confirmpassword" placeholder="Confirm Password" value={formData.confirmpassword} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded-full text-gray-800" />

          <input type="text" name="contactnumber" placeholder="Contact Number" value={formData.contactnumber} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded-full text-gray-800" />

          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded-full text-gray-800" />

          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2 rounded-full text-gray-800" />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-full font-bold transition duration-200 ${
              loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">or</p>
          <div id="googleSignUpDiv" className="flex justify-center mt-3"></div>
        </div>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            className="underline text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
            onClick={() => navigate("/log")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
