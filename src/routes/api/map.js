const express = require('express');
const router = express.Router();

// @route POST api/map
// @desc Activate mapper
// @access Private
router.post(
	'/',
	require('../../middelwares/checkIsAuth'),
	require('../../controllers/sendMap')
);

module.exports = router;
