import React from 'react'
import Header from './Header'
import { useState,useEffect } from 'react'
import { useStyles } from './styling';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64';
import Button  from '@mui/material/Button'
import {  updateProfile } from '../features/auth/authSlice'

import getUser from '../features/auth/authSlice'

const UpdateProfile = () => {
  const classes = useStyles();

const{user}=useSelector((state)=>state.auth)

const dispatch = useDispatch();


const token =user.token;

 const navigate = useNavigate();


const [name, setName] = useState("");
const[email,setEmail]=useState("");
const [location, setLocation] = useState('');
const [occupation, setOccupation] = useState('');
const[profilePicture,setProfilePicture]=useState('');



const submitHandler=async(e)=>{
 e.preventDefault();
  
 await dispatch(updateProfile( {name, email,location,occupation},token));
  

  navigate('/');
  
}





  return (
    <div>
      <Header />
      <div>
        <form
          style={{
            marginTop:'1rem',
            marginLeft: '25%',
            height: ' 400px',
            backgroundColor: '#D3D3D3',
            width: '50%',
          }}
          onSubmit={submitHandler}
        >
          <h3>Update Profile</h3>
          <input
            type='text'
            value={name}
            placeholder='updated name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            value={email}
            placeholder='updated email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='text'
            value={location}
            placeholder='updated location'
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type='text'
            value={occupation}
            placeholder='updated occupation'
            onChange={(e) => setOccupation(e.target.value)}
          />
          <div className={classes.fileInput}>
            <FileBase
              type='file'
              multiple={false}
              onDone={({ base64 }) =>
                setProfilePicture({ ...profilePicture, selectedFile: base64 })
              }
            />
          </div>
          <button type='submit'>Update</button>
        </form>
      </div>
    </div>
  ); 
}

export default UpdateProfile