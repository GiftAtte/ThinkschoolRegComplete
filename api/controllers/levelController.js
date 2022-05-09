const Level = require("./../models/levelModel");
const catchAsync = require("./../utils/catchAsyn");

exports.createLevel = catchAsync(async (req, res, next) => {
  const level = await Level.create(req.body);
  res.status(201).json({
    status: "success",
    result: level.length,
    data: {
      level,
    },
  });
});

exports.getAllLevel = catchAsync(async (req, res, next) => {
  const level = await Cbt.find();
  res.status(200).json({
    status: "success",
    result: level.length,
    data: {
      level,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const level = await Level.findById(req.params.levelId);
  res.status(201).json({
    status: "success",
    result: 1,
    data: {
      level,
    },
  });
});

exports.deleteLevel = catchAsync(async (req, res, next) => {
  await Level.deleteOne({ _id: req.params.levelId });
  res.status(200).json({
    status: "success",
  });
});
