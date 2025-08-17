import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Register user
export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/register", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Login user
export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/login", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Fetch logged-in user info
export const fetchMe = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data.user;
  } catch (error) {
    throw error.response?.data || { message: "Not authenticated" };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await axiosInstance.post("/logout");
  } catch (error) {
    // Ignore errors here
  }
};
