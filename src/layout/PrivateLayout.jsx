import Sidebar from "../components/Sidebar";
import { Navigate, Outlet } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from '@apollo/client';
import { useAuth } from '../context/authContext';
import React, { useEffect, useState } from 'react';
import { REFRESH_TOKEN } from "../graphql/auth/mutations";
import { useNavigate } from "react-router";

const PrivateLayout = () => {
  const navigate = useNavigate();
  const {authToken,setToken,loadingAuth}= useAuth();
/* const {loadingAuth, setLoadingAuth} = useState(''); */
   const [refreshToken, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(REFRESH_TOKEN);
    
    
    useEffect(() => {

      refreshToken();
    }, [refreshToken]);
  useEffect(() => {
    console.log("dm", dataMutation);
    if(dataMutation){
      if(dataMutation.refreshToken.token){
        setToken(dataMutation.refreshToken.token)
      }else{
        setToken(null)
        navigate('/auth/login')

      }
   
    }
  
  }, [dataMutation,setToken,navigate])
//cerificar el token 
  useEffect(() => {
    console.log('token actual', authToken);
  }, [authToken])

if(loadingMutation  || loadingAuth) return <div>
  loading....
</div>


  /* if(!authToken) {
    navigate('/auth/login')
  } */
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen '>
    <Sidebar />
    
    <div className='flex w-full h-full '>
      <div className='w-full h-full  overflow-y-scroll '>
       
        <Outlet />



      </div>
      <ToastContainer/>
    </div>
  </div>
  );
};

export default PrivateLayout;
