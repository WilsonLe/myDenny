require('dotenv').config();

const cleanLinks = (links) => {
	const cleanedLinks = links.map((link) => {
		let url = link.url;
		let text = link.text;

		if (!link.url) return;
		// return undefined if link does not exist
		else if (link.url.startsWith('#')) return;
		// return undefined if link starts with "#"
		else if (link.url.startsWith('/')) {
			url = process.env.BASE_URL + url;
			text = text.trim(); // remove unnecessary white space from text
			return { url, text };
		}
		// transform relative links to absolute links
		else if (link.url.startsWith('http')) {
			text = text.trim(); // remove unnecessary white space from text
			return { url, text };
		} else return;
	});

	const filteredLinks = cleanedLinks.filter((link) => link !== undefined); // filter undefined links
	return filteredLinks;
};

module.exports = cleanLinks;
