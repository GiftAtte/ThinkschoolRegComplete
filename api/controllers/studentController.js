const Student = require("./../models/studentModel");
const catchAsync = require("./../utils/catchAsyn");

exports.createCbt = catchAsync(async (req, res, next) => {
  const student = await Student.create(req.body);
  res.status(201).json({
    status: "success",
    result: student.length,
    data: {
      student,
    },
  });
});

exports.getAllSchools = catchAsync(async (req, res, next) => {
  const student = await Student.find();
  res.status(200).json({
    status: "success",
    result: student.length,
    data: {
      student,
    },
  });
});

exports.findById = catchAsync(async (req, res, next) => {
  const cbt = await Cbt.findById(req.params.schoolId);
  res.status(201).json({
    status: "success",
    result: 1,
    data: {
      cbt,
    },
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  await Student.deleteOne({ _id: req.params.sudentId });
  res.status(200).json({
    status: "success",
  });
});
