const express = require('express');
const router = express.Router();

// @route POST api/reboot
// @desc Reboot server
// @access Private

// FIXME: remove commented requires
router.post(
	'/',
	// require('../../middelwares/scrapeLimiter'),
	// require('../../middelwares/checkIsAuth'),
	require('../../controllers/reboot')
);

module.exports = router;
