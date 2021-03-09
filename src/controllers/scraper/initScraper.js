const Visited = require('../../models/Visited');
const visited = require('./visited');
const initPuppeteer = require('./initPuppeteer');

require('dotenv').config();

const initScraper = async (req, res) => {
	try {
		await Visited.remove();

		const { page, browser } = await initPuppeteer(); // page is tab

		let toVisit = [
			{
				url: process.env.BASE_URL,
				text: process.env.BASE_TEXT,
				edges: '{}',
			},
		];

		while (toVisit.length != 0) {
			const { url, text, edges } = toVisit.pop();
			const currUrl = url;
			if (await visited(currUrl)) continue;
			if (!valid(currUrl)) {
				await new Visited({
					url: currUrl,
					text,
					edges,
					click: 0,
					timeClick: '{}',
				}).save();
				continue;
			}

			console.log(`Visiting: ${currUrl}`);

			await page.goto(currUrl, {
				waitUntil: 'load',
				timeout: 0,
			});

			if (await checkDuo(page)) await login(page);

			const linksHandle = await page.$$('a');

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
				} else {
					let edges = {};
					edges[currUrl] = 1;
					toVisit.push({
						url: nextUrl,
						text,
						edges: JSON.stringify(edges),
					});
				}
			}
			console.log(`Visited ${currUrl}`);
			await new Visited({
				url: currUrl,
				text,
				edges,
				click: 0,
				timeClick: '{}',
			}).save();
		}
		// const docs = await Visited.find();
		// console.log(docs);
		browser.close();
	} catch (error) {
		console.log(error);
	}
};

const login = async (page) => {
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
};
const checkDuo = async (page) => {
	const duoIframeHandle = await page.$('#duo_iframe');
	if (duoIframeHandle) return;
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
const valid = (currUrl) => {
	if (!currUrl) return false;

	if (
		currUrl.split('/')[currUrl.split('/').length - 1].includes('.pdf') ||
		currUrl.split('/')[currUrl.split('/').length - 1].includes('.csv') ||
		currUrl.split('/')[currUrl.split('/').length - 1].includes('.xlxs') ||
		currUrl.split('/')[currUrl.split('/').length - 1].includes('.docx')
	)
		return false;

	if (!currUrl.startsWith(process.env.BASE_URL)) return false;

	return true;
};
module.exports = initScraper;
