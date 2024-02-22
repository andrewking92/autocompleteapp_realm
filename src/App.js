import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import * as Realm from "realm-web";

// Initialize Firebase
const firebaseConfig = {
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// MongoDB Realm App ID
const app = new Realm.App({ id: REALM_APP_ID });

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const jwt = await firebaseUser.getIdToken(true);
        await loginWithRealmCustomJwt(jwt);
      } else {
        setUser(null);
      }
      setIsLoading(false); // Update loading state once check is complete
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(firebaseAuth, provider);
      const jwt = await firebaseAuth.currentUser.getIdToken(true);
      await loginWithRealmCustomJwt(jwt);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithEmailPassword = async (email, password, isSignUp = false) => {
    try {
      const userCredential = isSignUp
        ? await createUserWithEmailAndPassword(firebaseAuth, email, password)
        : await signInWithEmailAndPassword(firebaseAuth, email, password);
      const jwt = await userCredential.user.getIdToken(true);
      await loginWithRealmCustomJwt(jwt);
    } catch (error) {
      console.error("Error with email/password authentication:", error);
    }
  };

  const loginWithRealmCustomJwt = async (jwt) => {
    try {
      const credentials = Realm.Credentials.jwt(jwt);
      const realmUser = await app.logIn(credentials);
      console.log("Successfully logged in to Realm with custom JWT!", realmUser);
      setUser(realmUser);
    } catch (error) {
      console.error("Failed to log in to Realm with custom JWT", error);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(firebaseAuth);
      if (app.currentUser) {
        await app.currentUser.logOut();
      }
      setUser(null);
      console.log("Successfully signed out from both Firebase and Realm.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <img src="/mongodb-leaf_128x128.png" alt="Loading..." className="loader" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      {user ? (
        // Display user information and sign-out option
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <p>Welcome, {user.profile.email || 'User'}!</p>
            </div>
            <button
              onClick={signOut}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
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
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      {/* You can include the SVG for the email icon here */}
                    </svg>
                  </div>
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
                  onClick={() => loginWithEmailPassword(email, password, false)}
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
                    {/* Google icon SVG or image */}
                    Continue with Google
                  </button>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm">
                  Don't have an account? <a href="#" className="font-medium text-green-600 hover:text-green-500">Sign up</a>
                </p>
              </div>
            </div>
          </div>
      )}
      </div>
    );
  }

export default App;
