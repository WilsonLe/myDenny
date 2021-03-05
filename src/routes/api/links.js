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

// @route POST api/links
// @desc post upate link by url and update its time
// @access Public

router.post(
	'/click',
	require('../../middelwares/postLinksLimiter'),
	require('../../controllers/updateLinks')
);

module.exports = router;
