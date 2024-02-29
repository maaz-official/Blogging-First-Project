import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

// Authentication middleware
export const authenticateUser = catchAsyncErrors(async (req, res, next) => {
  // Check if token exists in headers
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Unauthorized, no token provided", 400));
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user by decoded id from token
    req.user = await User.findById(decoded.id);
    next();

});

// Authorization middleware
export const authorizeUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Forbidden, you are not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
