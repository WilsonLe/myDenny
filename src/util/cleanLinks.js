const cleanLinks = (links) => {
	const cleanedLinks = links.map((link) => {
		if (!link.href) return;
		if (link.href.charAt(0) == '#') return;

		const text = link.text;
		const cleanedText = text.trim();
		return { href: link.href, text: cleanedText };
	});

	const filteredLinks = cleanedLinks.filter((link) => link !== undefined);
	return filteredLinks;
};

module.exports = cleanLinks;
