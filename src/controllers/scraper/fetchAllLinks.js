const fs = require('fs');
const cleanLinks = require('./cleanLinks');
const compareLinks = require('./compareLinks');
const updateLinks = require('./updateLinks');
const fetchHomePageLinks = require('./fetchHomePageLinks');
const puppeteer = require('puppeteer');

require('dotenv').config();

const compareArray = (prevLinksList, currLinksList) => {
	let currUrlList = currLinksList.map((currLink) => currLink.url);
	let prevUrlList = prevLinksList.map((prevLink) => prevLink.url);
	for (let i = 0; i < currUrlList.length; i++) {
		if (!prevUrlList.includes(currUrlList[i])) {
			return 'not identical';
		}
	}
	return 'identical';
};
// FIXME: DEV FETCH HOMEPAGE LINK ALGO THAT'S RELIABLE FOR OTHER PAGES
const fetchAllLinks = async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 25,
		args: [
			'--disable-web-security',
			'--disable-features=IsolateOrigins,site-per-process',
		],
	});
	let prevLinksList = [];
	let currLinksList = [];
	const homePageLinks = await fetchHomePageLinks(browser);
	console.log(homePageLinks);
	currLinksList = [...homePageLinks];

	while (compareArray(prevLinksList, currLinksList) == 'not identical') {
		console.log('THERE CAN STILL BE MORE LINKS. LOOKING FOR MORE...');
		let nextLinksList = [...currLinksList];
		for (let i = 0; i < currLinksList.length; i++) {
			currLink = currLinksList[i];
			if (currLink.url.startsWith('http')) {
				const fetchedHtml = await getHtmlFromURl(browser, currLink.url);
				const linksFromFetchedHTML = cleanLinks(
					extractLinks(fetchedHtml)
				);
				linksFromFetchedHTML.forEach((link) =>
					nextLinksList.push(link)
				);
			}
			console.log('ADDED NEW LINKS IN ' + currLink.url);
		}

		prevLinksList = [...currLinksList];
		currLinksList = [...nextLinksList];
		console.log('Current link length: ' + currLinksList.length);
	}
	return currLinksList;
};

module.exports = fetchAllLinks;
