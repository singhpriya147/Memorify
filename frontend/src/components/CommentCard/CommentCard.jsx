import { Button, Typography } from '@mui/material';
import React,{useState,useEffect}from 'react';

import './CommentCard.css';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';


import { deleteComment } from '../../features/Posts/postSlice';
 const API_USER = 'http://localhost:5000/api/users';

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
  
   const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const deleteCommentHandle = async () => {
    
    const commentData={
      id:postId,
      commentId:commentId,
    }

  await dispatch(deleteComment(commentData));
 
   window.location.reload();
  };

  useEffect(() => {
    getData(userId);
   
  }, [userId]);

  const getData = async () => {
    const res = await fetch(
      API_USER+`${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const user = await res.json();
    setUserInComment(user);
     setLoading(false); 
 
  };

  if (loading) {
  
    return <div>Loading...</div>;
  }


  return (
    <div className='commentUser'>
      <img src={userInComment.profilePicture} alt={userInComment.name} />
      <Typography
        style={{ minWidth: '6vmax', fontWeight: 'bold', color: 'black' }}
      >
        {userInComment.name}
      </Typography>

      <Typography>{comment}</Typography>
      {loggedInUser === userId ? (
        <Button onClick={deleteCommentHandle}>
          <DeleteIcon />
        </Button>
      ) : loggedInUser === postUser ? (
        <Button onClick={deleteCommentHandle}>
          <DeleteIcon />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
