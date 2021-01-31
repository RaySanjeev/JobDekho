const Job = require('../model/jobModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.createJob = catchAsync(async (req, res, next) => {
  const job = await Job.create(req.body);

  res.status(201).json({
    status: 'success',
    data: job,
  });
});
