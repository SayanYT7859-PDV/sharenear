import { signInAnonymously, signOut as firebaseSignOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from './config';

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
