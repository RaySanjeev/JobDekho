const express = require('express');

const viewController = require('../controller/viewController');
const authController = require('../controller/authController');
const router = express.Router();

router.route('/login').get(viewController.renderLogin);
router.route('/userDashboard').get(viewController.renderUser);
router
  .route('/profile')
  .get(authController.protect, viewController.renderUserProfile);

module.exports = router;
