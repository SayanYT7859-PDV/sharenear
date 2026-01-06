// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import type { FirebaseOptions } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  ...(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ? { measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string } : {}),
};

// Helpful dev-time guard
if (!firebaseConfig.apiKey) {
  throw new Error("Missing VITE_FIREBASE_API_KEY in .env.local");
}

const app = initializeApp(firebaseConfig);

// Export the services you'll use across the app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
