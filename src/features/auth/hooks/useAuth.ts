import { useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { authService } from "../services/authService";

export const useAuth = () => {
  const { user, isLoading, error, setUser, setLoading, setError, clearError } =
    useAuthStore();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      clearError();
      const user = await authService.signInWithEmail(email, password);
      setUser(user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      clearError();
      const user = await authService.registerWithEmail(email, password);
      setUser(user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { user, isLoading, error, login, register, logout, clearError };
};
