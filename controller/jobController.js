const Job = require('../model/jobModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createJob = catchAsync(async (req, res, next) => {
  req.body.employer = req.user._id;
  const job = await Job.create(req.body);
  next();
});

exports.getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find({ employer: req.user._id });
  const jobCandidates = [];
  jobs.forEach((el) => {
    jobCandidates.push(el.candidates);
  });
  req.jobs = jobs;
  req.jobCandidates = jobCandidates;

  next();
});

exports.addUser = catchAsync(async (req, res, next) => {
  const jobDB = await Job.findById(req.body.jobId);
  let state;
  jobDB.candidates.forEach((el) => {
    if (String(el._id) === String(req.user._id)) state = true;
  });
  if (state) {
    return next(new AppError('You have already applied once', 400));
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
  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }
  const jobs = await Job.find({
    location: {
      $near: {
        $maxDistance: 1000,
        $geometry: { type: 'Point', coordinates: [lat, lng] },
      },
    },
  });
  req.jobs = jobs;
  next();
});
