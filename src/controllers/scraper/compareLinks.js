require('dotenv').config();

const Link = require('../../models/Link');

const compareLinks = async (newLinks) => {
	let changes = [];
	const oldLinks = await Link.find();
	const oldHref = oldLinks.map((oldLink) => oldLink.url);
	console.log(oldHref);
	return changes;
};

module.exports = compareLinks;
