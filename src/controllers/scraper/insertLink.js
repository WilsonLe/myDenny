const NewLink = require('../../models/NewLink');

const insertLink = async (link) => {
	try {
		await new NewLink(link).save();
	} catch (error) {
		console.log(error);
	}
};

module.exports = insertLink;
