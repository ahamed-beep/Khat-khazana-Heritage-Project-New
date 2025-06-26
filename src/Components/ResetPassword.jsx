import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { resetPassword } from './Redux/user';
import Nax from './Nax';

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [localSuccess, setLocalSuccess] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (newpassword !== confirmpassword) {
      setLocalError('Passwords do not match!');
      return;
    }

    const action = await dispatch(resetPassword({ token, newpassword }));
    if (resetPassword.fulfilled.match(action)) {
      setLocalSuccess(true);
      setTimeout(() => navigate('/log'), 3000); // Redirect after 3 seconds
    } else {
      setLocalError(action.payload?.message || 'Something went wrong.');
    }
  };

  return (
    <div>
      <Nax />
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-poppins">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-black">
            Reset Your Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div>
              <label htmlFor="newpassword" className="block text-sm font-medium text-black">
                New Password
              </label>
              <input
                id="newpassword"
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:border-black focus:ring-0"
              />
            </div>

            <div>
              <label htmlFor="confirmpassword" className="block text-sm font-medium text-black">
                Confirm Password
              </label>
              <input
                id="confirmpassword"
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
                className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:border-black focus:ring-0"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`flex mt-5 w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          {/* Error / Success Messages */}
          {localError && (
            <p className="mt-4 text-center text-sm text-red-600">
              {localError}
            </p>
          )}
          {localSuccess && (
            <p className="mt-4 text-center text-sm text-green-600">
              Password reset successful! Redirecting to login...
            </p>
          )}
          {error && !localError && (
            <p className="mt-4 text-center text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
