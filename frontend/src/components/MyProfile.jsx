import React from 'react';
import Card from '@mui/material/Card';
import { useStyles } from './styling';
import {  Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';


import { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';




import {Link} from 'react-router-dom'


function MyProfile({userId,token}) {
  const [user,setUser]=useState({name:'guest'});
  
   const classes = useStyles();
  
  useEffect(()=>{
     getData()
     
     
  },[])

   const getData = async()=>{
    const res = await fetch(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user =await res.json()
    setUser(user);
  
   }

  return (
    <>
      <Card
        className={classes.userCard}
        sx={{
          height: 350,
          width: 250,
        }}
      >
        <CardMedia
          sx={{
            height: 75,
            width: 75,
            borderRadius: 100,
            border: '1px solid grey',
            mt: 1,
          }}
          component='img'
          height='200'
          image={user.profilePicture}
          alt={user.name}
        />
        <CardContent>
          <Typography>{user.name}</Typography>
          <Typography>
            <EmailOutlinedIcon />
            {user.email}
          </Typography>
          <Typography>
            <LocationOnOutlinedIcon />
            {user.location}
          </Typography>
          <Typography>
            <WorkOutlineOutlinedIcon />
            {user.occupation}
          </Typography>

          {user && user.follower ? (
            <Typography>
              <h4>
                Follower {'   '}
                {user ? user.follower.length : 0}
              </h4>
            </Typography>
          ) : (
            <Typography>0 </Typography>
          )}
          {user && user.following ? (
            <Typography>
              <h4>Following {user ? user.following.length : 0}</h4>
            </Typography>
          ) : (
            <Typography>0 </Typography>
          )}
          <Link to='/update/profile'>
            <button>Update Profile</button>
          </Link>
          <Link to='/update/password'>
            <button>Change Password</button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}

export default MyProfile;
