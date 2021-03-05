const isUnique = require('./isUnique');
const insertLink = require('./insertLink');
require('dotenv').config();

const updateLinkFromUrl = async (page, url) => {
	if (url === process.env.BASE_URL) {
		try {
			const { additions, duplicates } = await handleHomePage(page);
			return { additions, duplicates };
		} catch (error) {
			console.log(error.name);
		}
	} else {
		try {
			const { additions, duplicates } = await handleOtherPage(page, url);
			return { additions, duplicates };
		} catch (error) {
			console.log(error.name);
		}
	}
};

const handleHomePage = async (page) => {
	try {
		let homePageLinks = [];
		let additions = 0;
		let duplicates = 0;

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
			const link = homePageLinks[i];
			const linkIsUnique = await isUnique(link);
			if (linkIsUnique) {
				await insertLink(link);
				additions++;
			} else duplicates++;
		}
		return { additions, duplicates };
	} catch (error) {
		console.log(error);
	}
};
const handleOtherPage = async (page, url) => {
	let pageLinks = [];
	let additions = 0;
	let duplicates = 0;
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
			if (url) {
				if (url.search('#') != -1)
					url = url.substring(0, url.search('#') - 1);

				if (url.endsWith('/')) url = url.substring(0, url.length - 1);
				pageLinks.push({ text, url });
			} else continue;
		}
		for (let i = 0; i < pageLinks.length; i++) {
			const link = pageLinks[i];
			if (await isUnique(link)) {
				await insertLink(link);
				additions++;
			} else duplicates++;
		}
		return { additions, duplicates };
	} catch (error) {
		if (error.code === 'E11000') {
			const additions = '#Error';
			const duplicates = '#Error';
			return { additions, duplicates };
		} else {
			console.log(error);
		}
	}
};
module.exports = updateLinkFromUrl;
