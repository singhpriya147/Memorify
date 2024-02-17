import {  Typography } from '@mui/material';
import React,{useState,useEffect}from 'react';

import './CommentCard.css';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';


import { deleteComment } from '../../features/Posts/postSlice';
//  const API_USER = 'http://localhost:5000/api/users';

const CommentCard = ({
  userId, // the person who commented
  comment,
  commentId,
  postId,
  token,
  postUser,
  loggedInUser,
}) => {
  const [userInComment, setUserInComment] = useState(null);
  // console.log(userId);
   const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const deleteCommentHandle = async () => {
    
    const commentData={
      id:postId,
      commentId:commentId,
    }

   dispatch(deleteComment(commentData));
 
  //  window.location.reload();
  };

  

  useEffect(() => {
    getData();
   
  }, []);









const getData = async () => {
  try {
    const res = await fetch(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }
    const user = await res.json();
    setUserInComment(user);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};




  if (loading) {
  
    return <div>Loading...</div>;
  }


  return (
    <div className='commentUser'>
      {userInComment && (
        <div className='user'>
          <img src={userInComment.profilePicture} alt={userInComment.name} />
          <Typography
            style={{ minWidth: '6vmax', fontWeight: 'bold', color: 'black' }}
          >
            {userInComment.name}
          </Typography>
          <Typography>{comment}</Typography>
        </div>
      )}

      <div>
        {loggedInUser === userId ? (
          <button
           
            onClick={deleteCommentHandle}
          >
            <DeleteIcon color='red' />
          </button>
        ) : (
          <button
           
            onClick={deleteCommentHandle}
          >
            <DeleteIcon color='red' />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
