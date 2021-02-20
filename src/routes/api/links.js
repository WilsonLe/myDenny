const express = require('express');
const router = express.Router();
// @route GET api/links
// @desc Get links
// @access Public

router.get(
	'/',
	require('../../middelwares/getLinksLimiter'),
	require('../../controllers/sendLinks')
);

module.exports = router;
