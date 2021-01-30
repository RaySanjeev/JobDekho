const User = require('../model/userModel');
const catcAsync = require('../utils/catchAsync');

exports.createUser = catcAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  });

  res.status(201).json({
    status: 'success',
    data: user,
  });
});
