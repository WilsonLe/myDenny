const fs = require('fs');
const getHTML = require('./getHTML');
const getLinks = require('./getLinks');
const cleanLinks = require('./cleanLinks');
require('dotenv').config();

const initScraper = async () => {
	if (process.env.NODE_ENV === 'test') {
		fs.readFile('html.txt', 'utf8', (err, html) => {
			let links = getLinks(html);
			links = cleanLinks(links);
			// console.log(links);
		});
	} else {
		html = await getHTML();
		fs.writeFile('html.txt', html, () => console.log('written to file'));
		// const links = getLinks(html);
	}
};

module.exports = initScraper;
