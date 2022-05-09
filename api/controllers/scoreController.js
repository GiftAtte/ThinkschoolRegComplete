const Score= require("./../models/scoreModel");
const catchAsync = require("./../utils/catchAsyn");

exports.createScore = catchAsync(async (req, res, next) => {
  const score = await Score.create(req.body);
  res.status(201).json({
    status: "success",
    result: score.length,
    data: {
      score,
    },
  });
});

exports.getAllSchools = catchAsync(async (req, res, next) => {
  const score = await Score.find();
  res.status(200).json({
    status: "success",
    result: score.length,
    data: {
      score,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const score = await Score.findById(req.params.scoreId);
  res.status(201).json({
    status: "success",
    result: 1,
    data: {
      score,
    },
  });
});

exports.deleteScore = catchAsync(async (req, res, next) => {
  await Score.deleteOne({ _id: req.params.scoreId });
  res.status(200).json({
    status: "success",
  });
});
