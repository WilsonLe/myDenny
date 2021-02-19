const fs = require('fs');
const getHTML = require('./util/getHTML');
const getLinks = require('./util/getLinks');
const cleanLinks = require('./util/cleanLinks');
const initExpress = require('./util/initExpress');
require('dotenv').config();
initExpress();

(async () => {
	if (process.env.NODE_ENV === 'test') {
		fs.readFile('html.txt', 'utf8', (err, html) => {
			let links = getLinks(html);
			links = cleanLinks(links);
			console.log(links);
		});
	} else {
		html = await getHTML();
		fs.writeFile('html.txt', html, () => console.log('written to file'));
		// const links = getLinks(html);
	}
})();
