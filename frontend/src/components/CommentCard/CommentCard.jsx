import { Button, Typography } from '@mui/material';
import React,{useState,useEffect}from 'react';

import './CommentCard.css';
// import { Delete } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';

// import { deleteCommentOnPost } from '../../Actions/Post';
// import { getFollowingPosts, getMyPosts } from '../../Actions/User';
// import getFollowingPosts from '.';
import { deleteComment } from '../../features/Posts/postSlice';
//  const API_USER = 'http://localhost:5000/api/users';
 const API_USER = 'https://memorify.onrender.com/api/users/';
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
  // const { user } = useSelector((state) => state.user);
  // const token=user.token;
   const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const deleteCommentHandle = async () => {
    // console.log(" delete button clicked");
    const commentData={
      id:postId,
      commentId:commentId,
    }

  await dispatch(deleteComment(commentData));
  // dispatch(getUserFeed());
   window.location.reload();
  };

  useEffect(() => {
    getData(userId);
   
  }, []);

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
    // User data is loading or not available yet
    return <div>Loading...</div>;
  }

  // console.log(userId);
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
