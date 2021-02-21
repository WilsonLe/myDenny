const fs = require('fs');
const getHTML = require('./getHTML');
const extractLinks = require('./extractLinks');
const cleanLinks = require('./cleanLinks');
const updateLinks = require('./updateLinks');
require('dotenv').config();

const initScraper = async () => {
	if (process.env.NODE_ENV === 'development') {
		fs.readFile('html.txt', 'utf8', (err, html) => {
			if (err) return console.log(err);
			console.log(html);
			let links = extractLinks(html);
			links = cleanLinks(links);
			updateLinks(links);
		});
	} else {
		html = await getHTML();
		fs.writeFile('html.txt', html, () => console.log('written to file'));
		// const links = getLinks(html);
	}
};

module.exports = initScraper;
