import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Change this as needed for deployment
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/register", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/login", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};
