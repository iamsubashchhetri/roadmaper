
// Import the Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, User } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, arrayUnion, query, where, getDocs } from 'firebase/firestore';

// Your Firebase configuration
// Replace with your own Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
