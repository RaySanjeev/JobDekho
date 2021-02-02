const Job = require('../model/jobModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.createJob = catchAsync(async (req, res, next) => {
  const job = await Job.create(req.body);
});

exports.addUser = catchAsync(async (req, res, next) => {
  const jobDB = await Job.findById(req.body.jobId);
  let state;
  jobDB.candidates.forEach((el) => {
    if (String(el) === String(req.user._id)) state = true;
  });
  if (state) {
    return next(new appError('You have already applied once', 400));
  }

  const job = await Job.findByIdAndUpdate(req.body.jobId, {
    $push: { candidates: req.user._id },
  });

  res.status(200).json({
    status: 'success',
    message: 'Successfully applied',
  });
});

exports.getNearByJobs = catchAsync(async (req, res, next) => {
  const { lat, lng } = req.params;
  const radius = 200 / 6378.1;
  console.log(radius);
  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }
  const jobs = await Job.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  req.jobs = jobs;
});
