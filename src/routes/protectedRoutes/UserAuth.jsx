import React, { Children, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../config/axiosInstance'
const UserAuth = ({children , role}) => {

  const navigate = useNavigate()
  const location = useLocation()
  const [user , setUser] = useState()

    const checkUser = async () =>{
        try{
          const response = await axiosInstance({
            url: "/user/checkUser",
            method: "GET",
            withCredentials: true
          });
          const userData = response.data;
          if(userData && userData.role === role){
            setUser({
              userId: response.data.userId,  // Capture userId from response
              role: response.data.role
            });
          }else{
            navigate('/');
          }
        }catch(error){
          navigate('/')
          console.log(error)
        }
    }

  useEffect(() => {
    checkUser();
  },[location.pathname]);


  return user ? React.cloneElement(children, { userId: user.userId }) : null;
}

export default UserAuth