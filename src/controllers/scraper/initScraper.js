const fetchAndUpdateAllLinks = require('./fetchAndUpdateAllLink');

require('dotenv').config();

const initScraper = async (req, res) => {
	// const allCurrLinks = await fetchAllLinks();
	// console.log(`Number of current links: ${allCurrLinks.length}`);
	// const { additions, removals } = compareLinks(allCurrLinks);
	// console.log(`Number of additions: ${additions}`);
	// console.log(`Number of removals: ${removals}`);
	// await updateLinks({ additions, removals });
	await fetchAndUpdateAllLinks();
};

module.exports = initScraper;
