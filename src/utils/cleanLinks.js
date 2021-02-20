require('dotenv').config();

const cleanLinks = (links) => {
	const cleanedLinks = links.map((link) => {
		let url = link.url;
		let text = link.text;

		if (!link.url) return; // return undefined if link does not exist
		if (link.url.charAt(0) == '#') return; // return undefined if link starts with "#"
		if (link.url.charAt(0) == '/') url = process.env.URL + url; // transform relative links to absolute links
		text = text.trim(); // remove unnecessary white space from text
		return { url, text };
	});

	const filteredLinks = cleanedLinks.filter((link) => link !== undefined); // filter undefined links
	return filteredLinks;
};

module.exports = cleanLinks;
