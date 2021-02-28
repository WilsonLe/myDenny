const NewLink = require('../../models/NewLink');

const isUnique = async (link) => {
	const { url, text } = link;
	try {
		const docs = await NewLink.find({ url });
		if (docs.length != 0) return false;
		else return true;
	} catch (error) {
		console.log(error);
	}
};

module.exports = isUnique;
