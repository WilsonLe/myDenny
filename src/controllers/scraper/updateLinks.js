require('dotenv').config();

const Link = require('../../models/Link');

const updateLinks = async ({ additions, removals }) => {
	const removalsUrl = removals.map((removal) => removal.url);
	try {
		const res = await Link.insertMany(additions, { ordered: false });
		console.log(`Inserted ${additions.length} links`);
	} catch (error) {
		console.log(error);
	}

	try {
		const res = await Link.deleteMany({ url: { $in: removalsUrl } });
		console.log(`Deleted ${removals.length} links`);
	} catch (error) {
		console.log(error);
	}
};

module.exports = updateLinks;
