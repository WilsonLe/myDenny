const fetchAndUpdateAllLinks = require('./fetchAndUpdateAllLink');

require('dotenv').config();

const initScraper = async (req, res) => {
	try {
		await fetchAndUpdateAllLinks();
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = initScraper;
