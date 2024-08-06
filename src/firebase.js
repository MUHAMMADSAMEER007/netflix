import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA6oe2SFNe7PykwRrnfcnIOownmUYzdOJA",
  authDomain: "netflix-clone-40521.firebaseapp.com",
  projectId: "netflix-clone-40521",
  storageBucket: "netflix-clone-40521.appspot.com",
  messagingSenderId: "295587598401",
  appId: "1:295587598401:web:de8f70af90689f647bb6c0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up:', userCredential.user);
  } catch (error) {
    console.error('Error signing up:', error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
  } catch (error) {
    console.error('Error logging in:', error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error.message);
    toast
  }
};

export { auth, db, signup, login, logout };
