const fetchAndUpdateAllLinks = require('./fetchAndUpdateAllLink');
require('dotenv').config();

const initScraper = async () => {
	await fetchAndUpdateAllLinks();
};

module.exports = initScraper;
