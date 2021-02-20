const { parse } = require('node-html-parser');
const getLinks = (html) => {
	let links = [];
	while (html.search('<a') != -1) {
		const startIndex = html.search('<a');
		const endIndex = html.search('</a>') + 4;
		const linkTag = html.substring(startIndex, endIndex);
		const linkEle = parse(linkTag).childNodes[0];
		// console.log(linkEle);
		const url = linkEle.getAttribute('href');
		const text = linkEle.textContent;
		links.push({ url, text });
		html = html.substring(endIndex);
	}
	return links;
};

module.exports = getLinks;
