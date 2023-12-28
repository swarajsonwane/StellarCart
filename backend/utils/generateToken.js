import jwt from "jsonwebtoken";


const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '30d'}); // Create token
        
    //Set JWT as HTTP only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',   // Set secure to true in production for https
        sameSite: 'strict',  
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    });

};

export default generateToken;