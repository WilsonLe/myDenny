const Redis = require('ioredis');
require('dotenv').config();

const initRedis = () => {
	const visited = new Redis(process.env.REDIS_URL);
	const willVisit = new Redis(process.env.REDIS_URL);
	return { visited, willVisit };
};

module.exports = initRedis;
