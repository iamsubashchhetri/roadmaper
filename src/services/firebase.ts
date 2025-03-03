
// Import the Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, User } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, arrayUnion, query, where, getDocs } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi5rSk9AhGt1HJAWWz-yoPlP4m-fvwWtM",
  authDomain: "airoadmapgenerator-b3de9.firebaseapp.com",
  projectId: "airoadmapgenerator-b3de9",
  storageBucket: "airoadmapgenerator-b3de9.appspot.com",
  messagingSenderId: "998119689866",
  appId: import.meta.env.VITE_FIREBASE_APP_ID // You need to add your app ID in the .env file
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create user document if it doesn't exist
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
        savedRoadmaps: [],
        searchHistory: []
      });
    }
    
    return user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if this is a new user
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      // Create a new user document
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
        searchHistory: [],
        savedRoadmaps: []
      });
    }
    
    return user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logOut = () => signOut(auth);

// User data functions
export const saveSearch = async (userId: string, searchQuery: string) => {
  try {
    const searchData = {
      query: searchQuery,
      timestamp: new Date()
    };
    
    await updateDoc(doc(db, 'users', userId), {
      searchHistory: arrayUnion(searchData)
    });
  } catch (error) {
    console.error("Error saving search", error);
    throw error;
  }
};

export const saveRoadmap = async (userId: string, roadmap: any) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      savedRoadmaps: arrayUnion({...roadmap, savedAt: new Date()})
    });
  } catch (error) {
    console.error("Error saving roadmap", error);
    throw error;
  }
};

export const getUserData = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user data", error);
    throw error;
  }
};

export { auth, db };
