// @route GET api/links
// @desc Get links
// @access Public

// Link model
const OfficialLink = require('../models/OfficialLink');

const sendLinks = async (req, res) => {
	const links = await OfficialLink.find();
	return res.json(links);
};

module.exports = sendLinks;
