import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:4500', // Set your API base URL here or use environment variable
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // This is necessary if you’re handling cookies for authentication
  });

export default axiosInstance