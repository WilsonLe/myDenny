const express = require('express');
const router = express.Router();

// @route POST api/scrape
// @desc Activate scraper
// @access Private
router.post(
	'/',
	// require('../../middelwares/scrapeLimiter'),
	require('../../middelwares/checkIsAuth'),
	require('../../controllers/scraper/initScraper')
);

module.exports = router;
