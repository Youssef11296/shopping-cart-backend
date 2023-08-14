import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

export const registerUser = asyncHandler (async (req, res) => {
  try {
    const {avatar, username, email, password} = req.body;
    if (!username || !email || !password)
      throw new Error (
        'All fields are required, username, email, and password.'
      );
    const user =
      (await User.findOne ({username})) || (await User.findOne ({email}));
    if (user) throw new Error ('User with the same name or email exists.');
    const hashedPassword = await bcrypt.hash (password, 10);
    const newUser = await User.create ({
      avatar,
      username,
      email,
      password: hashedPassword,
    });
    newUser.token = generateToken (newUser._id);
    await newUser.save ();
    res.status (201).json ({
      success: true,
      message: 'Succeffully registered.',
      user: {avatar, username, email, token: newUser.token},
    });
  } catch (error) {
    res.status (400).json ({succesS: false, message: error.message});
  }
});

export const loginUser = asyncHandler (async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password)
      throw new Error ('All fields are required, email, and password.');
    const user = await User.findOne ({email});
    if (!user) {
      res.status (404);
      throw new Error ('User not found, try register.');
    }
    if (user && !await bcrypt.compare (password, user.password))
      throw new Error ('Incorrect password.');
    user.token = generateToken (user._id);
    res.status (201).json ({
      success: true,
      message: 'Successfully logged in.',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: user.token,
      },
    });
  } catch (error) {
    res.status (400).json ({success: false, message: error.message});
  }
});

export const getMe = asyncHandler (async (req, res) => {
  try {
    const {user} = req;
    res.status (200).json ({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        age: user.age,
        contact: {
          phoneNumber: user.contact.phoneNumber,
          telegram: user.contact.telegram,
          whatsApp: user.contact.whatsApp,
        },
        address: {
          location: user.address.location,
          country: user.address.country,
          city: user.address.city,
        },
        token: user.token,
      },
    });
  } catch (error) {
    res.status (400).json ({success: false, message: error.message});
  }
});
