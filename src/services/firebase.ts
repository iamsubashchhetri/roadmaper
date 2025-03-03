// Import the Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

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

// Initialize Google provider
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signInWithGoogle = async () => {
  try {
    console.log("Attempting to sign in with Google from domain:", window.location.hostname);
    const result = await signInWithPopup(auth, googleProvider);

    // Check if this is a new user
    const user = result.user;
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    // If user doesn't exist, create a new document
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
        roadmaps: []
      });
    }

    return user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    
    // More detailed error logging for domain issues
    if (error.code === 'auth/unauthorized-domain') {
      console.error("Domain authorization error - Make sure to add this domain to Firebase Console:", {
        currentDomain: window.location.hostname,
        fullOrigin: window.location.origin
      });
    }
    
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
    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);
    
    if (userSnapshot.exists()) {
      // Update existing user document
      await updateDoc(userRef, {
        savedRoadmaps: arrayUnion({...roadmap, savedAt: new Date()})
      });
    } else {
      // Create new user document if it doesn't exist yet
      await setDoc(userRef, {
        savedRoadmaps: [{...roadmap, savedAt: new Date()}],
        createdAt: new Date()
      });
    }
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

export const saveRoadmapToUser = async (userId: string, roadmapId: string) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      roadmaps: arrayUnion(roadmapId)
    });
    return true;
  } catch (error) {
    console.error("Error saving roadmap to user", error);
    throw error;
  }
};

export { auth, db };