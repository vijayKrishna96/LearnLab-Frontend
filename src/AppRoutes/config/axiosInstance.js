import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL , // Set your API base URL here or use environment variable
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // This is necessary if you’re handling cookies for authentication
  });

// Interceptor to attach the token from localStorage to each request
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // If a token exists, attach it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance