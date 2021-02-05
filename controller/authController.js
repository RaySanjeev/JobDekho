const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const Email = require('../utils/email');
const User = require('../model/userModel');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = function (user, statusCode, req, res) {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: req.secure ||
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.sendOTP = catchAsync(async (req, res, next) => {
  const { email, name, role, signup } = req.body;

  const randomNumber = Math.trunc(Math.random() * 1000000);
  const timeStamp = Date.now() + 10 * 24 * 60 * 60 * 1000;

  if (!email) {
    return next(new appError('Please provide email.', 400));
  }

  const user = await User.findOneAndUpdate(
    { email },
    { otp: randomNumber, expiresAt: timeStamp },
    {
      new: true,
    }
  );

  if (!user) {
    return next(new appError('No user account found. Please sign up!', 400));
  }

  new Email(user, randomNumber).sendOTP();

  if (!signup) {
    res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully',
    });
  } else {
    next();
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (Date.now() > user.expiresAt) {
    return next(new AppError('Your OTP has expired. Please try again!', 400));
  }

  if (Number(otp) !== user.otp) {
    return next(new AppError('Entered OTP is invalid. Please try again', 400));
  }
  user.otp = undefined;
  user.save();
  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
