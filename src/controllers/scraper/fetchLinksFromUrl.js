require('dotenv').config();
const fetchHomePageLinks = async (browser, url) => {
	let pageLinks = [];

	try {
		const page = await browser.newPage();
		await page.goto(url);

		await (() => new Promise((res) => setTimeout(res, 3000)))();

		const linksHandle = await page.$$('a');
		for (let i = 0; i < linksHandle.length; i++) {
			const linkHandle = linksHandle[i];
			const text = await page.evaluate(
				(el) => el.textContent,
				linkHandle
			);
			const url = await page.evaluate((el) => el.href, linkHandle);
			pageLinks.push({ text, url });
		}
		await page.close();
		return pageLinks;
	} catch (error) {
		console.log(error);
	}
};

module.exports = fetchHomePageLinks;
