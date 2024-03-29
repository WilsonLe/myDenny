const redis = require('../../utils/initRedis');
const logger = require('../../utils/logger');

const visited = async (url) => {
	try {
		const res = await redis.get(url);
		if (res) return true;
		else return false;
	} catch (error) {
		logger.error(error);
	}
};

module.exports = visited;
