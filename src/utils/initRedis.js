require('dotenv').config();
const redisUri = process.env.REDIS_URI;
const redis = require('async-redis').createClient({ url: redisUri });
const logger = require('./logger');

redis.on('error', (error) => {
	logger.error(error);
});

module.exports = redis;
