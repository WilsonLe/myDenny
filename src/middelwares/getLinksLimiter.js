const rateLimit = require('express-rate-limit');

// Init limiter
const getLinksLimiter = rateLimit({
	// Every 30 secs
	windowMs: 30 * 1000,
	// 10 requests
	max: 5,
	message: {
		msg:
			'You have exceeded 5 tries for the last 30 seconds. Please try again in a minute.',
	},
});

module.exports = getLinksLimiter;
