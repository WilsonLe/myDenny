const express = require('express');
const router = express.Router();

// @route POST api/auth
// @desc Auth admin
// @access Public
router.post(
	'/',
	require('../../middelwares/authLimiter'),
	require('../../controllers/auth/authAdmin')
);

// @route GET api/auth/links
// @desc Validate token, then send (PUBLIC) links
// @access Private
router.get(
	'/links',
	require('../../middelwares/authLimiter'),
	require('../../middelwares/checkIsAuth'),
	require('../../controllers/sendLinks')
);

module.exports = router;
