import e from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    console.log(req.body);

    const {email, password} = req.body;  // Destructuring from req.body

    const user = await User.findOne({email}); // Find user by email

    if(user  && (await user.matchPassword(password))){ // If user exists and password matches
       
         generateToken(res, user._id);   // Generate token

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });     // Send user details

    }else{  // If user does not exist or password does not match   
        res.status(401);    // Unauthorized
        throw new Error('Invalid email or password');
    }
    }
);

// @desc     Register a new user
// @route   POST /api/users/login
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    
    const {name, email, password} = req.body;  // Destructuring from req.body   

    const userExist = await User.findOne({email}); // Find user by email

    if(userExist){  // If user exists
        res.status(400);    // Bad request
        throw new Error('User already exists');
    }else{
        const user = await User.create({name, email, password}); // Create user

        if(user){   // If user is created

            generateToken(res, user._id);

            res.status(201).json({  // Send user details
                _id:user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        }
        else{
            res.status(400);    // Bad request
            throw new Error('Invalid user data');
        }
    }
});

// @desc    Log out user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    
   res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV !== 'development',   // Set secure to true in production for https
        sameSite: 'strict',  
    });

    res.status(200).json({message: 'Logged out successfully'});
    }
);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    
   const user = await User.findById(req.user._id);

   if(user){
         res.status(200).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
         });
   }
   else{
        res.status(404);
        throw new Error('User not found');
   }   
    }
);

// @desc    Update User profile
// @route   PUT /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

   if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
             user.password = req.body.password;
        }
        const updatedUser = await user.save();
        generateToken(res, updatedUser._id);
        res.status(200).json({
             _id: updatedUser._id,
             name: updatedUser.name,
             email: updatedUser.email,
             isAdmin: updatedUser.isAdmin,
        });
   
   }
    else{
          res.status(404);
          throw new Error('User not found');
    }   
     }
    
);

// @desc    Get Users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    
    res.send('Get users');
    }
);

// @desc    Get User by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    
    res.send('Get user by Id');
    }
);

// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    
    res.send('Get user by Id');
    }
);

// @desc    Delete Users
// @route   Delete /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    
    res.send('Get users');
    }
);

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}