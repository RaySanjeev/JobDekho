const catchAsync = require('../utils/catchAsync');
const Job = require('../model/jobModel');

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

exports.renderUserProfile = (req, res) => {
  console.log(req.user);

  res.status(200).render('profile', {
    title: 'Profile',
    user: req.user,
  });
};
