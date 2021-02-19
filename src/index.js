const fsLibrary = require('fs');
const getHTML = require('./util/getHTML');
require('dotenv').config();
let html;

(async () => {
	if (process.env.NODE_ENV == 'test')
		fsLibrary.readFile('html.txt', 'utf8', (err, data) => (html = data));
	else html = await getHTML();
	fsLibrary.writeFile('html.txt', html, () => console.log('written to file'));
})();
