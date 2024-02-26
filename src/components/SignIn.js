import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = ({ loginWithEmailPassword, signInWithGoogle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center justify-center">
        <img src="/mongodb-leaf_128x128.png" alt="MongoDB Atlas" className="w-12 h-auto mb-8" />
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => loginWithEmailPassword(email, password)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Continue
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
              <span className="sr-only">Sign in with Google</span>
              Continue with Google
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Don't have an account? <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
