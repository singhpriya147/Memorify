const mongoose=require('mongoose');
const crypto=require('crypto');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please add a name'],
      min: 2,
      max: 50,
    },
    avatar:{
    public_id:String,
    url:string,
  },
    email: {
      type: String,
      required: [true, 'please add a email'],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
      minlength:[6,"password must be at least of 6 character"],
      select:false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostMessage',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

   
    location:{
      type: String,
      required: [true, 'please add a location'],
    } ,
    occupation:{
       type: String,
      required: [true, 'please add a job'],
    },
    resetPasswordToken: String,
    resetPasswordExpire:Date,
  },

  {
    timestamps: true,
  }
);

userSchema.methods.getResetPasswordToken= function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};


module.exports = mongoose.model('User',userSchema);
