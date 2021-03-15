const redis = require('../../utils/initRedis');
const logger = require('../../utils/logger');
const RedisLink = require('../../models/RedisLink');

const insertLink = async (link) => {
	try {
		await redis.set(link.url, JSON.stringify(link));
		await RedisLink.findOneAndUpdate(
			{ url: link.url },
			{ ...link },
			{
				upsert: true,
			}
		);
	} catch (error) {
		logger.error(error);
	}
};
module.exports = insertLink;
