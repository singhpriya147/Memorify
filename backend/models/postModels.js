const mongoose= require ('mongoose');
const postSchema = mongoose.Schema({
  // owner of the post
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  owner: {
    type: String,
    required: true,
  },
  title: String,
  message: String,
  location: String,
  selectedFile: String,

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module. exports=mongoose.model('PostMessage',postSchema);