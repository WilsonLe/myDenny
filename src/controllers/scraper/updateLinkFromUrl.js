const isUnique = require('./isUnique');
const insertLink = require('./insertLink');
require('dotenv').config();

const updateLinkFromUrl = async (page, url) => {
	if (url === process.env.BASE_URL) await handleHomePage(page, url);
	else await handleOtherPage(page, url);
};

const handleHomePage = async (page, url) => {
	let homePageLinks = [];
	let additions = 0;
	let duplicates = 0;
	try {
		await page.goto(process.env.BASE_URL, {
			waitUntil: 'load',
			timeout: 0,
		});
		await page.type('#username', process.env.NAME);
		await page.type('#password', process.env.PASSWORD);
		await page.click('button[type="submit"]');

		await (() => new Promise((res) => setTimeout(res, 5000)))();

		const frameHandle = await page.$('#duo_iframe');

		const frame = await frameHandle.contentFrame();

		await frame.click(
			'#auth_methods > fieldset > div.row-label.push-label > button'
		);

		await page.waitForSelector('#mydenison-header');

		console.log('Logged in');

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
			homePageLinks.push({ text, url });
		}

		for (let i = 0; i < homePageLinks.length; i++) {
			if (await isUnique(link)) {
				await insertLink(link);
				additions++;
			} else duplicates++;
		}
		return { additions, duplicates };
	} catch (error) {
		console.log(error.name);
	}
};
const handleOtherPage = async (page, url) => {
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
		for (let i = 0; i < pageLinks.length; i++) {
			if (await isUnique(link)) {
				await insertLink(link);
			}
		}
	} catch (error) {
		console.log(error);
	}
};
module.exports = updateLinkFromUrl;
