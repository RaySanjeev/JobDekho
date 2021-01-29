const express = require('express');

const viewController = require('../controller/viewController')
const router = express.Router();

router.route('/login').get(viewController.renderLogin);

module.exports = router;