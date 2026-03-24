import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";
import { auth } from "../../../services/firebase";
import { AuthUser } from "../../../types/User";

const mapFirebaseUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

const getErrorMessage = (code: string): string => {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/email-already-in-use":
      return "This email is already registered";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/weak-password":
      return "Password must be at least 6 characters";
    case "auth/network-request-failed":
      return "Network error. Check your connection";
    default:
      return "Authentication failed. Please try again";
  }
};

export const authService = {
  signInWithEmail: async (
    email: string,
    password: string,
  ): Promise<AuthUser> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return mapFirebaseUser(result.user);
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code));
    }
  },

  registerWithEmail: async (
    email: string,
    password: string,
  ): Promise<AuthUser> => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return mapFirebaseUser(result.user);
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code));
    }
  },

  signOut: async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error("Failed to sign out");
    }
  },

  onAuthStateChanged: (callback: (user: AuthUser | null) => void) => {
    return onAuthStateChanged(auth, (user) => {
      callback(user ? mapFirebaseUser(user) : null);
    });
  },
};
