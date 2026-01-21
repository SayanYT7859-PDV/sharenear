import {
  signInAnonymously,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from './config';

/**
 * Sign in with email and password
 */
export const loginEmail = async (email: string, password: string): Promise<User> => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

/**
 * Sign up with email and password
 */
export const signupEmail = async (email: string, password: string): Promise<User> => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

/**
 * Sign in as a demo/anonymous user
 */
export const signInDemo = async (): Promise<User> => {
  const result = await signInAnonymously(auth);
  return result.user;
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Check if a user is currently signed in
 */
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null;
};


