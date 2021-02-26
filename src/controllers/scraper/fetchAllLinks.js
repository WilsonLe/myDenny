const fetchHomePageLinks = require('./fetchHomePageLinks');
const fetchLinksFromUrl = require('./fetchLinksFromUrl');
const necessaryLinkToGoAndFetch = require('./necessaryLinkToGoAndFetch');
const comparePrevCurrLinks = require('./comparePrevCurrLinks');
const puppeteer = require('puppeteer');

require('dotenv').config();

const fetchAllLinks = async () => {
	const browser = await puppeteer.launch({
		headless: process.env.NODE_ENV == 'development' ? false : true,
		slowMo: 25,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-web-security',
			'--disable-features=IsolateOrigins,site-per-process',
		],
	});
	const page = await browser.newPage();
	page.on('dialog', async (dialog) => {
		console.log('Got a dialog');
		console.log(dialog.message());
		await dialog.dismiss();
	});

	let prevLinksList = [];
	let currLinksList = [];
	const homePageLinks = await fetchHomePageLinks(page);
	currLinksList = [...homePageLinks];

	while (
		comparePrevCurrLinks(prevLinksList, currLinksList) == 'not identical'
	) {
		console.log('THERE CAN STILL BE MORE LINKS. LOOKING FOR MORE...');
		let nextLinksList = [...currLinksList];
		for (let i = 0; i < currLinksList.length; i++) {
			let additions = 0;
			let duplicates = 0;
			currLink = currLinksList[i];

			const { linkIsNecessary, message } = necessaryLinkToGoAndFetch(
				currLink.url,
				prevLinksList
			);

			if (linkIsNecessary) {
				const fetchedLinks = await fetchLinksFromUrl(
					page,
					currLink.url
				);

				const nextUrlList = nextLinksList.map(
					(nextLink) => nextLink.url
				);

				fetchedLinks &&
					fetchedLinks.forEach((fetchedLink) => {
						if (nextUrlList.includes(fetchedLink.url)) {
							duplicates++;
						} else {
							nextLinksList.push(fetchedLink);
							additions++;
						}
					});
				console.log(
					`added ${additions} links in ${currLink.url} (${duplicates} duplicates)`
				);
			} else {
				console.log(`Skipped ${currLink.url}`);
				console.log(`Reason: ${message}`);
				console.log('__________________');
			}
		}

		prevLinksList = [...currLinksList];
		currLinksList = [...nextLinksList];
		console.log('Current link length: ' + currLinksList.length);
	}
	return currLinksList;
};

module.exports = fetchAllLinks;
