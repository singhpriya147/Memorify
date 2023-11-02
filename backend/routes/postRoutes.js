const express =require('express');
const {
  getUserPosts,
  createPost,
  editPost,
  likePost,
  deletePost,
  getPostOfFollowing,
  CommentOnPost,
  deleteComment,
} = require('../controllers/postControllers');


 const router =express.Router();


 const {protect}=require('../middleware/authMiddleware')


router.post('/',protect, createPost);

router.get('/', protect, getPostOfFollowing);

router.put('/:id',protect, editPost);    

router.delete('/:id', protect, deletePost);

router.get('/:userId/posts', protect, getUserPosts);

router.get('/:id', protect, likePost);

router.put('/comment/:id',protect,CommentOnPost); 

router.delete('/comment/:id',protect,deleteComment);  

 module.exports= router;