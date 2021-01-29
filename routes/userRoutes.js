const express = require('express')

const userController = require('../controller/userController');
const authController = require('../controller/authController');
const viewController = require('../controller/viewController');

const router = express.Router();

router.route('/sendOTP').post(authController.sendOTP);
router.route('/login').post(authController.login, viewController.dashboard);
router.route('/').post(userController.createUser)

module.exports = router;