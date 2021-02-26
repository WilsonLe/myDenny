const fetchAllLinks = require('./fetchAllLinks');
const compareLinks = require('./compareLinks');
const updateLinks = require('./updateLinks');

require('dotenv').config();

const initScraper = async () => {
	const allCurrLinks = await fetchAllLinks();

	console.log(`Number of current links: ${allCurrLinks.length}`);
	const { additions, removals } = compareLinks(allCurrLinks);

	console.log(`Number of additions: ${additions}`);
	console.log(`Number of removals: ${removals}`);
	await updateLinks({ additions, removals });
};

module.exports = initScraper;
