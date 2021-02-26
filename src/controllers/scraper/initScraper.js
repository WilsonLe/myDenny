const fetchAllLinks = require('./fetchAllLinks');
const compareLinks = require('./compareLinks');
const updateLinks = require('./updateLinks');

require('dotenv').config();

const initScraper = async () => {
	const allCurrLinks = await fetchAllLinks();
	console.log('All links length: ' + allCurrLinks.length);
};

module.exports = initScraper;
