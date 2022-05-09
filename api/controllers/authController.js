const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsyn");
const jwt = require("jsonwebtoken");
const sendMail=require('../utils/email')



const createSendToken =async (user, statusCode, res) => {
  const token = await signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("tsa", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};


const signToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.TOKEN_EXPIRE_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  //  console.log(req.user)
  let user = await User.create(req.body);

  if (user) {
    createSendToken(user,200,res)
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Password or email is empty
  if (!email || !password)
    return next(new AppError("You must enter passsword and email", 401));

  let user = await User.findOne({ email: email }).select("+password");
  // Check if there is no user
  if (!user) return next(new AppError("User does not exist", 404));

  if (!(await user.comparePassword(password, user.password)))
    return next(new AppError("wrong credentials", 400));
    createSendToken(user,200,res)
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with this email", 404));
  }
  const passwordResetToken = user.createPasswordRestToken();
  //res.send(passwordResetToken);
  console.log(user);
  await user.save({ validateBeforeSave: false });
  //  await user.save();

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${passwordResetToken}`;
  const message = `Forgot your paasword? submit a 
    patch request with your new and confirmed password to the the url: ${resetURL}. If you didn't forget please ignor.
   
    `;
  try {
    await sendMail({
      from:process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset password link (valid for 10mins)",
      message,
    });
    //  console.log(message);
    return res.status(200).json({
      status: "success",
      message: "Token sent to your email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        `There was error sending mail, please try again later ${err.message}`,
        500
      )
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // retrieve user
  const user = await User.findOne({
    passwordResetToken: hashedPassword,
    passwordResetExpires: { $gte: Date.now() },
  });

  if (!user) {
    return next(new appError("user does not exist or token has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = await signToken(user._id);
  res.status(200).json({
    status: "success",
    data: {
      token,
      user,
    },
  });
});

