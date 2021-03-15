const redis = require('../../utils/initRedis');
const logger = require('../../utils/logger');

const getLink = async (url) => {
	try {
		return JSON.parse(await redis.get(url));
	} catch (error) {
		logger.error(error);
	}
};
module.exports = getLink;
