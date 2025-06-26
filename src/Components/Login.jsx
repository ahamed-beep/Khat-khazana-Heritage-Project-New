import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginuser } from './Redux/user';
import { Link, useNavigate } from 'react-router';
import Nax from './Nax';
import toast from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await dispatch(loginuser({ email, password }));

    if (res.payload.success) {
      toast.success(res.payload.message);
      setEmail('');
      setPassword('');

      localStorage.setItem('token', res.payload.token);
      localStorage.setItem('userId', res.payload.id);
      localStorage.setItem('userRole', res.payload.role);

      if (res.payload.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } else {
      toast.error(res.payload.message);
    }

    setLoading(false);
  };

  return (
    <div>
          <Nax />
   
    <div className="flex justify-center items-center min-h-screen bg-white">
  
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={formHandler} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pr-10 rounded-full border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <i className="bx bxs-user absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"></i>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pr-10 rounded-full border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                tabIndex={-1}
              >
                {showPwd ? (
                  <i className="bx bx-hide text-xl" />
                ) : (
                  <i className="bx bx-show text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="accent-blue-500 mr-2" /> Remember me
            </label>
            <Link to="/forgot" className="text-blue-600 underline hover:text-blue-800">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-full font-bold transition duration-200 ${
              loading
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/sign" className="underline text-blue-600 hover:text-blue-800 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
     </div>
  );
}

export default Login;
