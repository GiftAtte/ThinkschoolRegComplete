const Question= require("./../models/questionModel");
const catchAsync = require("./../utils/catchAsyn");

exports.createQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.create(req.body);
  res.status(201).json({
    status: "success",
    result: question.length,
    data: {
      question,
    },
  });
});

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const question = await Questionjj.find();
  res.status(200).json({
    status: "success",
    result: question.length,
    data: {
      question,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.questionId);
  res.status(201).json({
    status: "success",
    result: 1,
    data: {
      question,
    },
  });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  await Question.deleteOne({ _id: req.params.questionId });
  res.status(200).json({
    status: "success",
  });
});
