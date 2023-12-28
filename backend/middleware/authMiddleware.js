import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;
    //console.log(req.headers.authorization);
    //Read the jwt from cookie
    token = req.cookies.jwt;
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(decoded);
            req.user = await User.findById(decoded.userId).select('-password');   // Add user to req object so it can be accessed in all the protected routes
            next();
        }catch(error){
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }

    }else{
        res.status(401);
        throw new Error('Not authorized, no token');
    }
   
});


// Admin middleware
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export {protect, admin};