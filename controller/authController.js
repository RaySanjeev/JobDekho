const jwt = require('jsonwebtoken');

const Email = require('../utils/email')
const User = require('../model/userModel');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

const createSendToken = function(user, statusCode, req, res) {
    const token = signToken(user._id);
  
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
      // secure: req.secure ||
    });
  
    user.password = undefined;

    req.user = user;
    req.token = token;
  
    // res.status(statusCode).json({
    //   status: 'success',
    //   token,
    //   data: {
    //     user
    //   }
    // });
  };

exports.sendOTP = catchAsync(async (req, res, next) => {
    const {email} = req.body;

    if(!email) {
        next(new appError('Please provide email.', 400))
    }

    const randomNumber = Math.trunc(Math.random() * 1000000);
    const timeStamp = Date.now() + 10 * 24 * 60 * 60 * 1000;

    const user = await User.findOneAndUpdate({email}, {otp: randomNumber, expiresAt: timeStamp}, {
        new: true
    })

    new Email(user, randomNumber).sendOTP();

    res.status(200).json({
        status: 'success',
        message: 'OTP sent successfully'
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const {email, otp} = req.body;

    const user = await User.findOne({email});
    if(Date.now() > user.expiresAt) {
        return next(new AppError('Your OTP has expired. Please try again!', 400))
    }
    console.log(typeof(otp), typeof(user.otp))
    if(Number(otp) !== user.otp) {
        return next(new AppError('Entered OTP is invalid. Please try again', 400))
    }
    user.otp = undefined;
    user.save();
    createSendToken(user, 200, req, res)
})