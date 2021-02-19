require('dotenv').config();

const cleanLinks = (links) => {
	const cleanedLinks = links.map((link) => {
		let href = link.href;
		let text = link.text;

		if (!link.href) return; // return undefined if link does not exist
		if (link.href.charAt(0) == '#') return; // return undefined if link starts with "#"
		if (link.href.charAt(0) == '/') href = process.env.URL + href; // transform relative links to absolute links
		text = text.trim(); // remove unnecessary white space from text
		return { href, text };
	});

	const filteredLinks = cleanedLinks.filter((link) => link !== undefined); // filter undefined links
	return filteredLinks;
};

module.exports = cleanLinks;
