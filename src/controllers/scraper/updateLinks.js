require('dotenv').config();

const Link = require('../../models/Link');

const updateLinks = async (links) => {
	try {
		const res = await Link.insertMany(links, { ordered: false });
		console.log(res);
	} catch (error) {
		console.log(error);
	}
};

module.exports = updateLinks;
