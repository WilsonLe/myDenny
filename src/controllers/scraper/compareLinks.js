require('dotenv').config();

const Link = require('../../models/Link');

const compareLinks = async (newLinks) => {
	let additions = [];
	let removals = [];
	const oldLinks = await Link.find();
	const oldUrls = oldLinks.map((oldLink) => oldLink.url);
	const newUrls = newLinks.map((newLink) => newLink.url);

	newLinks.forEach((newLink) => {
		if (!oldUrls.includes(newLink.url)) additions.push(newLink);
	});

	oldLinks.forEach((oldLink) => {
		if (!newUrls.includes(oldLink.url)) removals.push(oldLink);
	});
	return { additions, removals };
};

module.exports = compareLinks;
