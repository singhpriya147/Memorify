const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');
const PostMessage = require('../models/postModels');
const { sendEmail } = require('../middleware/sendEmail');

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    profilePicture,

    location,
    occupation,
  } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('pleasd add field');
  }

  // check if user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('user already exist');
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profilePicture,

    location,
    occupation,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }

  res.status(200).json({ message: 'register user' });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find user in database by email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid credential');
  }
});

// update a password

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect old password',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated',
    });

    const data = await response.json();
    console.log('backend reponse', data);
    return data;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// update profile

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('name')
      .populate('profilePicture')
      .populate('email')
      .populate('location')
      .populate('occupation');
    const { name, email, location, occupation, profilePicture } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (location) {
      user.location = location;
    }
    if (occupation) {
      user.occupation = occupation;
    }
    if (profilePicture) {
      user.profilePicture = profilePicture;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: 'profile updated',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'user not found',
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/users/password/reset/${resetPasswordToken}`;
    //  console.log(resetUrl);
    const message = `Reset your password by clicking the link below :\n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'reset password',
        message,
      });
      res.status(200).json({
        success: true,
        message: `email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: ' token is invalid or has expired',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // user.password=req.body.password;
    user.password = hashedPassword;
    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpire = undefined),
      await user.save();
    res.status(200).json({
      success: true,
      message: ' password reset successfull',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// geneerate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: '300d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  updatePassword,
  updateProfile,
  forgotPassword,
  resetPassword,
};
