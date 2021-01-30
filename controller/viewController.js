const catchAsync = require('../utils/catchAsync');

exports.dashboard = (req, res) => {
  res.status(200).render('');
};

exports.renderSendOTP = (req, res) => {
  res.status(200).render('sendOTP', {
    title: 'SendOTP',
  });
};

exports.renderLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'LOGIN',
  });
  s;
};
