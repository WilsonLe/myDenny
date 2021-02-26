require('dotenv').config();
const fetchHomePageLinks = async (page, url) => {
	let pageLinks = [];

	try {
		await page.goto(url, { waitUntil: 'load', timeout: 0 });

		const duoIframeHandle = await page.$('#duo_iframe');
		if (duoIframeHandle) return [];

		const linksHandle = await page.$$('a');
		for (let i = 0; i < linksHandle.length; i++) {
			const linkHandle = linksHandle[i];
			const text = await page.evaluate(
				(el) => el.textContent,
				linkHandle
			);
			let url = await page.evaluate((el) => el.href, linkHandle);

			if (url.search('#') != -1)
				url = url.substring(0, url.search('#') - 1);

			if (url.endsWith('/')) url = url.substring(0, url.length - 1);
			pageLinks.push({ text, url });
		}
		return pageLinks;
	} catch (error) {
		console.log(error);
	}
};

module.exports = fetchHomePageLinks;
