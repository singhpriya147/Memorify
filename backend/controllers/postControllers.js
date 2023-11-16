const asyncHandler = require('express-async-handler');
const PostMessage = require('../models/postModels.js');
const User = require('../models/userModels');

const getUserPosts = asyncHandler(async (req, res) => {
  try {
    const PostMessages = await PostMessage.find({ user: req.user.id });

    res.status(201).json(PostMessages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const createPost = asyncHandler(async (req, res) => {
 

  if (!req.body) {
    res.status(400).json({ message: 'please add all infomation' });
  }

  const newPostMessage = await PostMessage.create({
    title: req.body.title,
    message: req.body.message,
    selectedFile: req.body.selectedFile,

    user: req.user.id,
  });

  const user = await User.findById(req.user._id);
  user.posts.push(newPostMessage._id);
  await user.save();

  res.status(200).json(newPostMessage);
});

const editPost = async (req, res) => {
  try {
    const post = await PostMessage.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'post not found',
      });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'user not authorized',
      });
    }
    post.title = req.body.title;
    await post.save();
    return res.status(404).json({
      success: true,
      message: 'post updated',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await PostMessage.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'page not found',
      });
    }
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: 'post unliked',
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({
        success: true,
        message: 'post liked',
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const CommentOnPost = async (req, res) => {
  try {
    const post = await PostMessage.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'post not found',
      });
    }

    let commentIndex = -1;
    // checking if comment is already exists

    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });

    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;
      await post.save();

      return res.status(200).json({
        success: true,
        message: 'comment updated',
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: 'comment added',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const post = await PostMessage.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Checking If owner wants to delete

    if (post.user.toString() === req.user._id.toString()) {
      if (req.body.commentId === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Comment Id is required',
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: 'Selected Comment has deleted',
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: 'Your Comment has deleted',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePost = asyncHandler(async (req, res) => {
  const PostMessages = await PostMessage.findById(req.params.id);

  if (!PostMessages) {
    res.status(400);
    throw new Error(' not found');
  }
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error('user not found');
  }
  // make sure the logged in user matches the post user
  if (PostMessages.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user not authirized');
  }
  await PostMessages.remove();

  res.status(200).json({ id: req.params.id });
});

const getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const posts = await PostMessage.find({
      user: { $in: user.following },
    });

    res.status(200).json({
      success: true,

      posts: posts.reverse(),
      message: 'feed ',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUserPosts,
  createPost,
  getPostOfFollowing,
  editPost,
  likePost,
  deletePost,
  CommentOnPost,
  deleteComment,
};
