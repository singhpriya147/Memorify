import React from 'react'
import {useDispatch,useSelector} from 'react-redux'

import { useState } from 'react';
 import Header from './Header';
 import { Button } from '@mui/material';
 import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';



const UpdatePassword = () => {
const{user}=useSelector((state)=>state.auth)
const token =user.token;
 const [oldPassword,setOldPassword]=useState();
 const [newPassword,setNewPassword]=useState();
 const dispatch=useDispatch();
 const navigate= useNavigate();
const API_USER = 'https://localhost:5000/api/users/';


 const submitHandler=async(e)=>{
e.preventDefault();

await dispatch(updatePasswordfunc(oldPassword, newPassword, token));

  dispatch(logout());
   navigate('/login');
 }








 const updatePasswordfunc = async (oldPassword, newPassword, token) => {
   try {
     const response = await fetch(
       API_USER+'update/password',
       {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
           oldPassword: oldPassword,
           newPassword: newPassword,
         }),
       }
     );

     const data = await response.json();
     console.log('Response from Backend:', data);

     // Handle success or show a success message
   } catch (error) {
     console.error('Error in updatePassword:', error);

     // Handle error or show an error message
   }
 };




  return (
    <div className='update'>
      <Header />
      <div>
        <form
          style={{
            marginTop: '1rem',
            marginLeft: '25%',
            height: ' 400px',
            backgroundColor: '#D3D3D3',
            width: '50%',
          }}
          onSubmit={submitHandler}
        >
          <h3>Update Password</h3>
          <input
            type='password'
            value={oldPassword}
            placeholder='old password'
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type='password'
            value={newPassword}
            placeholder='New password'
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type='submit'>Update password</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword