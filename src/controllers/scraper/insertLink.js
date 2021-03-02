const NewLink = require('../../models/NewLink');
const Link = require('../../models/Link');

const insertLink = async (link) => {
	try {
		await new NewLink(link).save();
		await new Link(link).save();
	} catch (error) {
		console.log(error);
	}
};

module.exports = insertLink;
