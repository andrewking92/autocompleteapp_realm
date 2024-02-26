import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import * as Realm from "realm-web";
import { firebaseAuth } from './config/firebaseConfig';
import realmApp from './config/realmConfig';

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

const loginWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const jwt = await userCredential.user.getIdToken(true);
    await loginWithRealmCustomJwt(jwt);
  } catch (error) {
    console.error("Error with email/password authentication:", error);
  }
};

const registerWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const jwt = await userCredential.user.getIdToken(true);
    await loginWithRealmCustomJwt(jwt);
  } catch (error) {
    console.error("Error with email/password registration:", error);
  }
};

const loginWithRealmCustomJwt = async (jwt) => {
  try {
    const credentials = Realm.Credentials.jwt(jwt);
    const realmUser = await realmApp.logIn(credentials);
    console.log("Successfully logged in to Realm with custom JWT!", realmUser);
    return realmUser; // Return the user for further processing
  } catch (error) {
    console.error("Failed to log in to Realm with custom JWT", error);
    throw error; // Rethrow to handle it in the calling component
  }
};

const signOut = async () => {
  try {
    await firebaseSignOut(firebaseAuth);
    if (realmApp.currentUser) {
      await realmApp.currentUser.logOut();
    }
    console.log("Successfully signed out from both Firebase and Realm.");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export { signInWithGoogle, loginWithEmailPassword, registerWithEmailPassword, signOut, loginWithRealmCustomJwt };
