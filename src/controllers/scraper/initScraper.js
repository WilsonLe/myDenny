const Visited = require('../../models/Visited');
const visited = require('./visited');

require('dotenv').config();

const initScraper = async (req, res) => {
	try {
		const page = await initPuppeteer(); // page is tab
		let toVisit = [{ url: process.env.BASE_URL, text: 'My Denison' }];

		while (toVisit.length != 0) {
			const { currUrl, text } = toVisit.pop();

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

				if (nextUrl) {
					nextUrl = cleanUrl(nextUrl);

					if (await visited(nextUrl)) {
						const link = await Visited.findOne({ url: nextUrl });
						const edges = JSON.parse(link.edges);
						edges[nextUrl] = 1;
						link['edges'] = JSON.stringify(edges);
						await Visited.findOneAndUpdate({ url: nextUrl }, link);
					} else {
						toVisit.push({ url: nextUrl, text });
					}
				} else continue;
			}

			await new Visited({
				url: currUrl,
				text,
				edges: '{}',
				click: 0,
				timeClick: '{}',
			}).save();
		}
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

module.exports = initScraper;
