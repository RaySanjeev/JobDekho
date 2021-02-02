const express = require('express');

const jobController = require('../controller/jobController');
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');
const router = express.Router();

router
  .route('/createJob')
  .post(
    authController.protect,
    jobController.createJob,
    viewController.renderEmployer
  );

router
  .route('/:lat/:lng')
  .get(
    authController.protect,
    jobController.getNearByJobs,
    viewController.renderUser
  );

router.route('/addResume').post(authController.protect, jobController.addUser);

module.exports = router;
