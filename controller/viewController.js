const catchAsync = require('../utils/catchAsync');
const Job = require('../model/jobModel');
const User = require('../model/userModel');

exports.renderLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'LOGIN',
  });
};

exports.renderSignup = (req, res) => {
  res.status(200).render('signup', {
    title: 'SIGNUP',
  });
};

exports.renderVerifySignup = (req, res, next) => {
  res.status(200).render('verifySignup', {
    status: 'success',
    title: 'CREATE',
    user: req.user,
  });
};

exports.renderUser = catchAsync(async (req, res) => {
  let jobs;
  if (req.jobs) {
    jobs = req.jobs;
    console.log('fnkfafakafahfkafkll');
  } else {
    jobs = await Job.find();
  }

  console.log('viewCOntroller');
  res.status(200).render('user', {
    title: 'userDashboard',
    jobs,
    user: req.user,
  });
});

exports.renderEmployer = async (req, res) => {
  res.status(200).render('employer', {
    title: 'employerDashboard',
    user: req.user,
  });
};

exports.renderUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).render('profile', {
    title: 'Profile',
    user,
  });
});

exports.renderApplicants = (req, res) => {
  res.status(200).render('applicants', {
    title: 'APPLICANTS',
    jobs: req.jobs,
    jobCandidates: req.jobCandidates,
  });
};
