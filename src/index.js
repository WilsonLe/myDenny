const fs = require('fs');
const getHTML = require('./util/getHTML');
const getLinks = require('./util/getLinks');
require('dotenv').config();

(async () => {
	if (process.env.NODE_ENV === 'test') {
		console.log('hey');
		fs.readFile('html.txt', 'utf8', (err, html) => {
			const links = getLinks(html);
		});
	} else {
		html = await getHTML();
		fs.writeFile('html.txt', html, () => console.log('written to file'));
		// const links = getLinks(html);
	}
})();
