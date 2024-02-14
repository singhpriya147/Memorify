const mongoose= require ('mongoose');
const postSchema = mongoose.Schema({
  // owner of the post
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: String,
  message: String,
  location: String,
  image:{
    public_id:String,
    url:string,
  },

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