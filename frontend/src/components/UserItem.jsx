import { Card } from '@mui/material'
import { Button, CardHeader } from '@material-ui/core';
import{ Box} from '@mui/material';
import {Typography} from '@material-ui/core';
import {Paper} from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
// import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';








function UserItem({person}) 


{
 const { user } = useSelector((state) => state.auth);
 
  const token = user.token;
  // console.log(user._id);

 const API_USER = 'https://localhost:5000/api/users/';
const [isFollowing, setIsFollowing] = useState(false);
const [buttonLabel,setButtonLabel]=useState("Follow");


  
  

   const TofollowUser=async()=>{
    const res = await fetch(
      API_USER  +'follow/'  + `${person._id}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
      const data=await res.json();
      console.log(data);
      setIsFollowing(true);
      setButtonLabel('Unfollow');
     
   }
 const ToUnfollowUser = async () => {
   const res = await fetch(API_USER +' unfollow/'+`${person._id}`, {
     method: 'PUT',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`,
     },
   });
   const data = await res.json();
   console.log(data);
   setIsFollowing(false);
    setButtonLabel('Follow');
 };








  useEffect(()=>{

 

   if(person.follower.includes(  JSON.parse(localStorage.getItem("user"))._id)){
    setIsFollowing(true);
    setButtonLabel('Unfollow')
   }
   else{
     setIsFollowing(false);
      setButtonLabel('Follow');
   }
  },[setIsFollowing.person])












  return (
    <>
      <Box
        sx={{
          pl: '2rem',
          pr: '2rem',
          display: 'flex',
          flexDirection: 'row',
          // backgroundColor: '#E5BEEC',
          // alignItems: 'center',
          borderRadius: '5px',
          mb: '2vmax',
        }}
      >
        <Box
          sx={{
            pb: '0.5rem',
            display: 'flex',
            // bgcolor: 'grey',
            // width: '2rem',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardMedia
            sx={{
              height: 50,
              width: 50,
              borderRadius: 100,

              border: '1px solid grey',
              mt: 1,
            }}
            component='img'
            // height='50'
            image={person.profilePicture}
            alt={person.name}
          />

          <Typography variant='h6' sx={{ ml: '1rem' }}>
            {person.name}
          </Typography>

          <Typography>{person.location}</Typography>

          <button
            variant='contained'
            onClick={() => {
              if (isFollowing) {
                ToUnfollowUser();
              } else {
                TofollowUser();
              }
            }}
          >
            {buttonLabel}
          </button>
        </Box>
      </Box>
    </>
  );
}

export default UserItem