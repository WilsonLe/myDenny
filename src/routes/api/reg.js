const express = require('express');
const router = express.Router();

// @route POST api/reg
// @desc Register new user
// @access Dev only

router.post('/', require('../../controllers/auth/regUser'));

module.exports = router;
