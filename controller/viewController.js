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
  });
});

exports.renderUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).render('profile', {
    title: 'Profile',
    user,
  });
});
