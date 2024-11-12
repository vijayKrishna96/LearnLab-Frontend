import axios from "axios"
import { LOGIN_API, LOGOUT_API, USER_DETAILS_API } from "../Utils/Constants/Api"
import axiosInstance from "../Routes/config/axiosInstance";

export const userLogin = async (data) => {

  try {
    const response = await axiosInstance.post(LOGIN_API, data);
    return response;
  } catch (error) {
    console.log(error.response)
    throw error;
  }
 
  // try {
  //     const response = await axios.post({
  //         url: LOGIN_API,
  //         // method: "POST",
  //         data,
  //         withCredentials: true,
  //     });
  //     return response;
  // } catch (error) {
  //   console.log(error.response , "gsagg")
  //   throw error ;
  // }
};

export const userLogout = async() =>{
  try{
    const response = await axios({
      url: LOGOUT_API,
      method: "POST"
    })
    return response
  }catch(error){
    console.log(error.message)
  }
}

export const userCheck = async() => {
    try{
        const response = await axiosInstance({
            url: "/user/checkUser",
            method: "GET",
        });
        return response?.data;
    }catch(error){
        console.log(error)
    }
};


export const userDetails = async (userId) => {
    try {
      const response = await axios({
        url: USER_DETAILS_API,
        method: 'GET',
        params: {
          id: userId, // Assuming 'id' is the parameter name expected by your API
        },
      });
      return response?.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      // You might want to handle the error more gracefully here
      return null;
    }
  };