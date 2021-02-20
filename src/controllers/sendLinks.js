// @route GET api/links
// @desc Get links
// @access Public

// Link model
const Link = require('../models/Link');

const sendLinks = async (req, res) => {
	const links = await Link.find();
	console.log(links);
	return res.json(links);
};

module.exports = sendLinks;
