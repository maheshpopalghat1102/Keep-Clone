import api from "./api";

/**
 * Register User
 */
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

/**
 * Login User
 */
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

/**
 * Get User Profile
 */
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

/**
 * Delete logged-in account
 */
export const deleteAccount = async () => {
  const response = await api.delete("/auth/account");
  return response.data;
};

/**
 * Request password reset
 */
export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

/**
 * Reset password using token
 */
export const resetPassword = async (token, password) => {
  const response = await api.post(`/auth/reset-password/${token}`, {
    password,
  });
  return response.data;
};
