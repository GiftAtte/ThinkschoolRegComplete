const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsyn");
const path = require("path");

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    result: user.length,
    data: {
      user,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  console.log(path.join(__dirname, "../../client/public"));
  const user = await User.find();
  res.status(200).json({
    status: "success",
    result: user.length,
    data: {
      user,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  res.status(201).json({
    status: "success",
    result: 1,
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.deleteOne({ _id: req.params.userId });
  res.status(200).json({
    status: "success",
  });
});

exports.uploadProfileImage = catchAsync(async (req, res, next) => {
  if (req.files === null) {
    return next(new AppError("No file selected", 403));
  }

  const file = req.files.photo;
  const directory = path.join(
    `${__dirname}/../../client/public/img/profile/${req.user.id}.png`
  );
  file.mv(directory, (err) => {
    if (err) {
      return next(
        new AppError("There was error while uploading the file", 500)
      );

    }

const user=User.findById(req.user.id)
    user.photo = directory;
    await user.save();
    return res.status(200).json({
      status: "success",
      data: {
        path: directory,
      },
    });
  });
});
