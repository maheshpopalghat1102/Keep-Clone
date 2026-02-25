/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  getProfile,
  deleteAccount as deleteAccountService,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUserRaw = localStorage.getItem("user");
  const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

  const [user, setUser] = useState(storedUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const syncProfile = async () => {
      if (!storedUser?.token) return;
      try {
        const profile = await getProfile();
        saveUser({ ...storedUser, ...profile });
      } catch {
        logout();
      }
    };
    syncProfile();
  }, [storedUser]);

  /**
   * Save user to localStorage
   */
  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /**
   * Login (connect backend later)
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await loginUser({ email, password });
      saveUser(data);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register
   */
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const data = await registerUser({ name, email, password });
      saveUser(data);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      await deleteAccountService();
      logout();
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    deleteAccount,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
