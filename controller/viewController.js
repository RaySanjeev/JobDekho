const catchAsync = require("../utils/catchAsync");

exports.dashboard = catchAsync(async (req, res, next) => {
    res.status(200).render('')
})

exports.renderSendOTP = catchAsync(async (req, res, next) => {
    res.status(200).render('sendOTP', {
        title: 'SendOTP'
    });
});

exports.renderLogin = catchAsync(async (req, res, next) => {
    res.status(200).render('login', {
        title: 'LOGIN'
    })
})