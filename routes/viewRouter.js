const express = require('express');

const viewController = require('../controller/viewController');
const authController = require('../controller/authController');
const router = express.Router();

router.route('/login').get(viewController.renderLogin);
router
  .route('/userDashboard')
  .get(authController.protect, viewController.renderUser);

router
  .route('/employerDashboard')
  .get(authController.protect, viewController.renderEmployer);

router
  .route('/userDashboard/profile')
  .get(authController.protect, viewController.renderUserProfile);

module.exports = router;
