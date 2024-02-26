import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = ({ registerWithEmailPassword, signInWithGoogle }) => {
  // State for inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      await registerWithEmailPassword(email, password);
      navigate('/'); // Redirect on successful sign-up
    } catch (error) {
      // Handle sign-up error (e.g., show error message)
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center justify-center">
        <img src="/mongodb-leaf_128x128.png" alt="MongoDB Atlas" className="w-12 h-auto mb-8" />
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Full name"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Confirm Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleSignUp}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={signInWithGoogle}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign up with Google</span>
              Sign Up with Google
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account? <Link to="/signin" className="font-medium text-green-600 hover:text-green-500">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
