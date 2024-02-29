import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from "../middlewares/error.js"; // Importing error handling middleware
import { User } from "../models/userSchema.js"; // Importing User model
import { sendToken } from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';
// Route handler for user registration
export const register = catchAsyncErrors(async (req, res, next) => { // Corrected usage of catchAsyncError
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload an avatar", 400));
}

const { avatar } = req.files;
const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

if (!allowedFormats.includes(avatar.mimetype)) {
    return next(new ErrorHandler("Invalid file type. Please provide your avatar in PNG, JPEG, or WebP format", 400));
}

  const { name, email, password, phone, role, education } = req.body;
  
  // Check if all required fields are provided
  if (!name || !email || !password || !phone || !role || !education || !avatar) {
    return next(new ErrorHandler("Please fill all details!", 400));
  }

  // Check if the user already exists
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }
  
  const cloundinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath    
  );
  if(!cloundinaryResponse || cloundinaryResponse.error){
    console.error("Cloudinary Error:", cloundinaryResponse.error || "Unknown Cloudinary Error");
  }
  // Create a new user
  user = await User.create({
    name,
    email,
    password,
    phone,
    role,
    education,
    avatar:{
      public_id: cloundinaryResponse.public_id,
      url: cloundinaryResponse.secure_url,
    },
  });
sendToken(user, 200, "User Register Successfully", res);
});

  export const login = catchAsyncErrors(async (req, res, next)=>{
    const { email, password, role } = req.body;
    if( !email || !password || !role ){
      return next(new ErrorHandler("Please Provide full detail", 400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
      return next(new ErrorHandler("Invalid email and password", 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid email and password", 400))
    }
    if (user.role !== role){
      return next(new ErrorHandler(`user with provide role(${role}) not found`, 400));
    }
    sendToken(user, 200, "User Login Successfully", res);
}); 

export const logout = catchAsyncErrors((req, res, next)=>{
  res.status(200).cookie("token:", "",{
    expires: new Date(Date.now()),
    httpOnly: true,
  }).json({
    success: true,
    message: "User Logout!",

  });
});

export const getMyProfile = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
      success: true,
      user: user,
  });
});


export const getAllAuthors = catchAsyncErrors( async (req,res,next)=>{
  const authors = await User.find({ role: "Author" });
  res.status(200).json({
    success: true,
    authors,
  });
});