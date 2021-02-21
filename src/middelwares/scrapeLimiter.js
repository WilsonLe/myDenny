const rateLimit = require('express-rate-limit');

// Init limiter
const scrapeLimiter = rateLimit({
	// Every 5 minutes
	windowMs: 5 * 60 * 1000,
	// 10 requests
	max: 1,
	message: {
		msg: 'You can only activate Scrapy once every 5 minutes',
	},
});

module.exports = scrapeLimiter;
