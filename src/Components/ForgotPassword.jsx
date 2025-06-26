import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from './Redux/user';
import Nax from './Nax';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [localSuccess, setLocalSuccess] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    try {
      const action = await dispatch(forgotPassword({ email }));
      if (forgotPassword.fulfilled.match(action)) {
        setLocalSuccess(true);
        setEmail('');
      } else {
        setLocalError(action.payload?.message || "Something went wrong.");
      }
    } catch (error) {
      setLocalError(error.message || "Error occurred.");
    }
  };

  return (
    <div>
      <Nax />
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-poppins">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-black">
            Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:border-black focus:ring-0"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`flex mt-5 w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Success / Error Messages */}
          {localSuccess && (
            <p className="mt-4 text-center text-sm text-green-600">
              Reset link sent successfully!
            </p>
          )}
          {localError && (
            <p className="mt-4 text-center text-sm text-red-600">
              {localError}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
