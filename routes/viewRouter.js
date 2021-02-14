const express = require('express');

const viewController = require('../controller/viewController');
const authController = require('../controller/authController');
const jobController = require('../controller/jobController');
const router = express.Router();

router.route('/').get(viewController.renderLogin);

router.route('/signup').get(viewController.renderSignup);

router.route('/verify').get(viewController.renderVerifySignup);

router
  .route('/userDashboard')
  .get(authController.protect, viewController.renderUser);

router
  .route('/employerDashboard')
  .get(authController.protect, viewController.renderEmployer);

router
  .route('/userDashboard/profile')
  .get(authController.protect, viewController.renderUserProfile);

router
  .route('/applicants')
  .get(
    authController.protect,
    jobController.getAllJobs,
    viewController.renderApplicants
  );
module.exports = router;
