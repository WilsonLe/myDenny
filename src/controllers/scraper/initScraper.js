const Visited = require('../../models/Visited');
const logger = require('../../utils/logger');
const visited = require('./visited');
const necessaryUrlToGoAndFetch = require('./necessaryUrlToGoAndFetch');
const initPuppeteer = require('./initPuppeteer');

require('dotenv').config();

const initScraper = async (req, res) => {
	res.status(200).end();
	try {
		// remove collection for testing
		await Visited.remove();

		const { page, browser } = await initPuppeteer();

		// init dfs algo
		let toVisit = [
			{
				url: process.env.BASE_URL,
				text: process.env.BASE_TEXT,
				edges: '{}',
			},
		];

		// while there are still urls to visit, do:
		while (toVisit.length != 0) {
			const { url, text, edges } = toVisit.pop(); // get last element
			const currUrl = url; // create currUrl as alias for url extracted from last element

			if (await visited(currUrl)) {
				logger.info(`${currUrl} already visited.`);
				continue;
			}
			if (!currUrl) {
				logger.info(`${currUrl} does not exist.`);
				continue;
			}

			if (!necessaryUrlToGoAndFetch(currUrl)) {
				// if url is not valid for searching more links from, do not visit, just push to the visited.
				await new Visited({
					url: currUrl,
					text,
					edges,
					click: 0,
					timeClick: '{}',
				}).save();
				continue;
			}

			// else, if url is valid to visit and search links from, do the following:

			await page.goto(currUrl, {
				waitUntil: 'load',
				timeout: 0,
			});
			if (await checkLogin(page)) await login(page);

			const linksHandle = await page.$$('a');
			const noLinks = linksHandle.length;
			// sequentially loop through each link handles

			for (let i = 0; i < linksHandle.length; i++) {
				const linkHandle = linksHandle[i];
				let { nextUrl, text } = await handleParser(linkHandle, page);

				nextUrl = cleanUrl(nextUrl);

				if (await visited(nextUrl)) {
					const link = await Visited.findOne({ url: nextUrl });
					const edges = JSON.parse(link.edges);
					edges[currUrl] = 1;
					link['edges'] = JSON.stringify(edges);
					await Visited.findOneAndUpdate({ url: nextUrl }, link);

					logger.info(
						`${currUrl} - [${i}/${noLinks}] - ${nextUrl} visited. Adding to ${nextUrl}'s edges`
					);
				} else {
					let edges = {};
					edges[currUrl] = 1;
					toVisit.push({
						url: nextUrl,
						text,
						edges: JSON.stringify(edges),
					});

					logger.info(
						`${currUrl} - [${i}/${noLinks}] - Added ${nextUrl}.`
					);
				}
			}

			await new Visited({
				url: currUrl,
				text,
				edges,
				click: 0,
				timeClick: '{}',
			}).save();
		}
		await page.close();
		await browser.close();
	} catch (error) {
		logger.error(error);
	}
};

const checkLogin = async (page) => {
	const usernameInput = await page.$('#username');
	const passwordInput = await page.$('#password');
	if (usernameInput && passwordInput) return true;
	else return false;
};

const login = async (page) => {
	await page.type('#username', process.env.NAME);
	await page.type('#password', process.env.PASSWORD);
	await page.click('button[type="submit"]');

	await (() => new Promise((res) => setTimeout(res, 3000)))();

	const frameHandle = await page.$('#duo_iframe');
	const frame = await frameHandle.contentFrame();
	await frame.click(
		'#auth_methods > fieldset > div.row-label.push-label > button'
	);
	await page.waitForSelector('#mydenison-header');
	logger.info('Logged in');
};

const handleParser = async (linkHandle, page) => {
	// extract text from link handle
	const text = await page.evaluate((el) => el.textContent, linkHandle);

	// extract url from link handle
	const nextUrl = await page.evaluate((el) => el.href, linkHandle);

	return { nextUrl, text };
};
const cleanUrl = (nextUrl) => {
	if (nextUrl.search('#') != -1)
		nextUrl = nextUrl.substring(0, nextUrl.search('#') - 1);

	if (nextUrl.endsWith('/'))
		nextUrl = nextUrl.substring(0, nextUrl.length - 1);

	return nextUrl;
};
module.exports = initScraper;
