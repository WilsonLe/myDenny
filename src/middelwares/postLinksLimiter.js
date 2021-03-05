const rateLimit = require('express-rate-limit');

// Init limiter
const postLinksLimiter = rateLimit({
	// Every 2 secs
	windowMs: 2 * 1000,
	// 10 requests
	max: 1,
	message: {
		// msg:
		// 	'You have exceeded 1 update for the last 5 seconds. Please try again in a minute.',
	},
});

module.exports = postLinksLimiter;
