const catchAsync = require('../utils/catchAsync');
const Job = require('../model/jobModel');
const User = require('../model/userModel');

exports.renderLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'LOGIN',
  });
};

exports.renderUser = catchAsync(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).render('user', {
    title: 'userDashboard',
    jobs,
    user: req.user,
  });
});

exports.renderEmployer = async (req, res) => {
  console.log('afkbakbfkjb');
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
