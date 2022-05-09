const Cbt = require('./../models/cbtModel');
const catchAsync = require('./../utils/catchAsyn');


exports.createCbt = catchAsync(async (req, res, next) => {
    const cbt = await Cbt.create(req.body);
    res.status(201).json({
        status: 'success',
        result: cbt.length,
        data: {
            cbt
        }
     })
})

exports.getAllSchools = catchAsync(async (req, res, next) => {
  const cbt = await Cbt.find();
  res.status(200).json({
    status: "success",
    result: cbt.length,
    data: {
      cbt,
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

exports.deleteCbt = catchAsync(async (req, res, next) => {
  await Cbt.deleteOne({_id:req.params.id});
  res.status(200).json({
    status: "success",
   
  });
});

