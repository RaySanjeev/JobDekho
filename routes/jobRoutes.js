const express = require('express');

const jobController = require('../controller/jobController');
const router = express.Router();

router.route('/').post(jobController.createJob);

module.exports = router;
