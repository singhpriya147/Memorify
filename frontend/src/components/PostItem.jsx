import * as React from 'react';

import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import { TextField } from '@material-ui/core';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@material-ui/core';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


import Box from '@mui/material/Box';
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';

import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost } from '../features/Posts/postSlice';
import { editPost } from '../features/Posts/postSlice';
import { Button} from '@mui/material';
import { addComment } from '../features/Posts/postSlice';


import CommentCard from './CommentCard/CommentCard';


export default function PostItem({ post }) {

  const { user } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [noOfLikes, setNo] = useState(post.likes.length);

  const [commentValue, setCommentValue] = useState('');
  const [commentToggle, setCommentToggle] = useState(false);

  const[editCaption,setEditCaption]=useState('');

const [editCaptionToggle, setEditCaptionToggle] = useState(false);

  const dispatch = useDispatch();
// const API_POST = 'https://localhost:5000/api/posts/';

 
  const token = user.token;

  const postId = post._id;





const handleLike = async () => {
  console.log('clicked on like button');
  try {
    const response = await axios.get(`/api/posts/${post._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 ) {
      // If response is successful
      setLiked(true); // Update liked state to true
      setNo(noOfLikes + 1); // Increment the number of likes
    }
  } catch (error) {
    console.log(error);
  }
};


  const handleUnlike = async () => {
    try {
      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        //  credentials: 'include',
      });

      if (response.ok) {
        setLiked(false);
        setNo(noOfLikes - 1);
      }
    } catch (error) {
      
    }
  };

  // const handleUnlike = async () => {
  //   console.log("clicked on unlike button")
  //   try {
  //     const response = await axios.get(
  //       `/api/posts/${post._id}`,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //      if (response.status >= 200 && response.status < 300) {
  //        setLiked(true);
  //        setNo(noOfLikes - 1);
  //      }
  //   } catch (error) {}
  // };
  const addCommentHandler = async (e) => {
    e.preventDefault();
    console.log(' post comments');
    console.log(post.comments.length);
    const commentData = {
      id: postId, // Assuming postId is defined
      value: commentValue, // Assuming commentValue is defined
    };
 
        await dispatch(addComment(commentData));
   
    setCommentValue(''); // Clear the comment input field
     
    window.location.reload();
    
  }





  
  const editCaptionHandler = async(e) => {
     e.preventDefault();
   
    const captionData={
      id:postId,
      value:editCaption,
    }
     await dispatch(editPost(captionData));
     setEditCaption('');
  };




const cardStyle = {

  // width: 650, 
  // height: "auto",
  backgroundColor:"white",
display: "flex",
//  flexWrap: "wrap",
flexDirection:"column",
// alignItems:"center",
// justifiedContent:"center",
  
};
  return (
    <Box sx={{ paddingBottom: '2rem' }}>
      <Box sx={cardStyle}>
        <CardHeader title={post.title} subheader={post.user.name} />
        <Typography variant='caption' color='textSecondary'>
          {new Date(post.createdAt).toLocaleString()}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color='textSecondary'>
          {post.location}
        </Typography>
        <Box sx={{display: "flex",

          flexDirection:"column",
          alignItems:"center"}}>
          <CardMedia
            component='img'
            image={post.selectedFile}
            alt={post.title}
            sx={{ height: '50%', width: '50%', objectFit: 'cover' }}
          />
        </Box>

        <CardContent>
          <Typography variant='body2' color='textPrimary'>
            {post.message}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <div className='post-footer'>
            {liked ? (
              <Favorite style={{ color: 'red' }} onClick={handleUnlike} />
            ) : (
              <FavoriteBorder style={{ color: 'grey' }} onClick={handleLike} />
            )}
            <Typography>{noOfLikes}</Typography>
          </div>

          <div className='post-footer'>
            <ChatBubbleOutline
              onClick={() => setCommentToggle(!commentToggle)}
            />
            <Typography>{post.comments.length}</Typography>
          </div>

          <Dialog
            open={commentToggle}
            onClose={() => setCommentToggle(!commentToggle)}
          >
            <div style={{ minwidth: 500, height: '100vh', padding: '2vmax' }}>
              <Typography variant='h4'>Comments</Typography>
              <form
                style={{
                  backgroundColor: '#fff',
                  padding: '2rem',
                  borderRadius: '0.5rem',
                  boxShadow: ' 0px 0px 5px #ddd',
                  textAlign: 'center',
                  width: '100%',
                }}
                onSubmit={addCommentHandler}
              >
                <TextField
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder='Comment Here...'
                  required
                />

                <button type='submit' variant='contained'>
                  Add
                </button>
              </form>

              {post.comments && post.comments.length > 0 ? (
                post.comments.map((item) => (
                  <CommentCard
                    userId={item.user}
                    comment={item.comment}
                    commentId={item._id}
                    key={item._id}
                    postId={postId}
                    // isAccount={isAccount}
                    token={user.token}
                    postUser={post.user}
                    loggedInUser={user._id}
                  />
                ))
              ) : (
                <Typography>Loading</Typography>
              )}
            </div>
          </Dialog>

          {user._id === post.user ? (
            <div className='post-footer'>
              <DeleteIcon onClick={() => dispatch(deletePost(post._id))} />
            </div>
          ) : null}

          {user._id === post.user ? (
            <div className='post-footer'>
              <EditIcon
                onClick={() => setEditCaptionToggle(!editCaptionToggle)}
              />
              <Dialog
                open={editCaptionToggle}
                onClose={() => setEditCaptionToggle(!editCaptionToggle)}
              >
                <div
                  style={{ minwidth: 500, height: '100vh', padding: '2vmax' }}
                >
                  <Typography variant='h4'>Edit Caption </Typography>
                  <form
                    style={{
                      backgroundColor: '#fff',
                      padding: '2rem',
                      borderRadius: '0.5rem',
                      boxShadow: ' 0px 0px 5px #ddd',
                      textAlign: 'center',
                      width: '100%',
                    }}
                    onSubmit={editCaptionHandler}
                  >
                    <TextField
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      placeholder='Caption Here...'
                      required
                    />

                    <Button type='submit' variant='contained'>
                      Post
                    </Button>
                  </form>
                </div>
              </Dialog>
            </div>
          ) : null}
        </CardActions>
      </Box>
    </Box>
  );
}
