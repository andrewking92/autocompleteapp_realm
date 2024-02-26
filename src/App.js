import React, { useState, useEffect } from 'react';
import { firebaseAuth } from './config/firebaseConfig';
import { signInWithGoogle, loginWithRealmCustomJwt, loginWithEmailPassword, registerWithEmailPassword, signOut } from './authService';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const jwt = await firebaseUser.getIdToken(true);
        try {
          const realmUser = await loginWithRealmCustomJwt(jwt); // Adjusted to use authService
          setUser(realmUser);
        } catch (error) {
          console.error("Error logging in with custom JWT", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handlers for UI actions
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("SignIn with Google failed:", error);
    }
  };

  const handleLoginWithEmailPassword = async (email, password) => {
    try {
      await loginWithEmailPassword(email, password);
    } catch (error) {
      console.error("Login with email/password failed:", error);
    }
  };

  const handleCreateWithEmailPassword = async (email, password) => {
    try {
      await registerWithEmailPassword(email, password);
    } catch (error) {
      console.error("Login with email/password failed:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null); // Ensure local user state is cleared
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
        <Routes>
          <Route path="/" element={user ? <Landing user={user} signOut={handleSignOut} /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={!user ? <SignIn loginWithEmailPassword={handleLoginWithEmailPassword} signInWithGoogle={handleSignInWithGoogle} /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignUp registerWithEmailPassword={handleCreateWithEmailPassword} signInWithGoogle={handleSignInWithGoogle} /> : <Navigate to="/" />} />
          {/* Handle unknown routes */}
          <Route path="*" element={<Navigate to={user ? "/" : "/signin"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
