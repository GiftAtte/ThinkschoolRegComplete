const AppError = require("../utils/appError");
const { promisify } = require("util");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsyn");
const jwt = require("jsonwebtoken");


exports.protect = catchAsync( async (req, res, next) => {
  let token;
  let authorization = req.headers.authorization;
  if (!authorization) return next(new AppError("You are not logged in", 401));
  if (authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);
  let user = await User.findById(decoded.id);
  // console.log(decoded);
  if (!user) {
    return next(new AppError("User does not exist or invalid token", 401));
  }

  if (user.passwordChanged(decoded.iat)) {
    return next(new AppError("The user password was changed", 401));
  }

  req.user = user;
  next();
});

exports.permittedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) next(new AppError('You dont have permission to perform this action',403))
    next()
    }
}