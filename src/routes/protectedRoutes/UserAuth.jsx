import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance'; // If you have a configured axios instance
import axios from 'axios';
import { BASE_URL_API } from '../../Utils/Constants/Api';

const UserAuth = ({ children, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState();

  const checkUser = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        navigate('/');
        return;
      }

      // Make the API call to check the user authentication status
      const response = await axios({
        url: `${BASE_URL_API}/user/checkUser`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
      
      const userData = response.data;
      
      if (userData && userData.role === role) {
        setUser({
          userId: userData.userId,  // Capture userId from response
          role: userData.role,
        });
      } else {
        navigate('/');
      }
    } catch (error) {
      // If there's an error, navigate to the home page
      navigate('/');
      console.error('Error during user authentication:', error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return user ? React.cloneElement(children, { userId: user.userId }) : <div>Loading...</div>;
};

export default UserAuth;
