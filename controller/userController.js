const fs = require('fs');
const multer = require('multer');

const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

let resumeName;

const rewriteResume = (req) => {
  const resumeArray = fs.readdirSync('./public/resume');

  const el = resumeArray.find(
    (el) => String(el.split('-')[1]) === String(req.user._id)
  );
  if (el) {
    fs.unlink(`./public/resume/${el}`, function (err) {
      if (err) console.log(err);
      console.log('File deleted');
    });
  }
};

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/resume');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    resumeName = `user-${req.user._id}-${Date.now()}.${ext}`;
    rewriteResume(req);
    cb(null, resumeName);
  },
});

const multerFilter = (req, file, cb) => {
  console.log('file');
  if (file.mimetype.startsWith('application/pdf')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an pdf! Please upload only pdf.', 400), false);
  }
};

const upload = multer({
  fileFilter: multerFilter,
  storage: multerStorage,
});

exports.checkMultipleUploads = catchAsync(async (req, res, next) => {
  rewriteResume(req);
  next();
});

exports.uploadResume = upload.single('resume');

exports.resumeDB = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      resume: resumeName,
    },
    {
      new: true,
    }
  );
});

exports.createUser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  });

  if (req.body.signup) {
    req.user = user;
    next();
  } else {
    res.status(201).json({
      status: 'success',
      data: user,
    });
  }
});

exports.updateName = catchAsync(async (req, res, next) => {
  console.log(fs.readdirSync('./public/resume'));
  const { name } = req.body;
  await User.findByIdAndUpdate(req.user._id, { name });
  next();
});

exports.updateEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  await User.findByIdAndUpdate(req.user._id, { email });
  next();
});

exports.updateResume = catchAsync(async (req, res, next) => {
  // console.log(resumeName);
  await User.findByIdAndUpdate(req.user._id, { resume: resumeName });
  next();
});
