const express = require('express');

const userController = require('../controller/userController');
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

const router = express.Router();

router.route('/sendOTP').post(authController.sendOTP);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/').post(userController.createUser);

router
  .route('/signupOTP')
  .post(
    userController.createUser,
    authController.sendOTP,
    viewController.renderVerifySignup
  );

router
  .route('/updateName')
  .post(
    authController.protect,
    userController.updateName,
    viewController.renderUserProfile
  );

router
  .route('/updateEmail')
  .post(
    authController.protect,
    userController.updateEmail,
    viewController.renderUserProfile
  );

router
  .route('/updateResume')
  .post(
    authController.protect,
    userController.uploadResume,
    userController.updateResume,
    viewController.renderUserProfile
  );

router
  .route('/uploadResume')
  .post(
    authController.protect,
    userController.checkMultipleUploads,
    userController.uploadResume,
    userController.resumeDB
  );

module.exports = router;
