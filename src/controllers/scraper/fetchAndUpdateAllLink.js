const updateLinkFromUrl = require('./updateLinkFromUrl');
const necessaryUrlToGoAndFetch = require('./necessaryUrlToGoAndFetch');
const compareUrl = require('./compareUrl');
const initPuppeteer = require('./initPuppeteer');
const NewLink = require('../../models/NewLink');

require('dotenv').config();

const fetchAndUpdateAllLinks = async () => {
	let urlHistory = [process.env.BASE_URL];
	const page = await initPuppeteer(); // page is tab
	await updateLinkFromUrl(page, process.env.BASE_URL); // fetch and update dtb from BASE_URL
	const urlsToFetchAndUpdate = await NewLink.find().map((link) => link.url); //

	while (compareUrl(urlHistory, urlsToFetchAndUpdate) == 'not identical')
		for (let i = 0; i < urlsToFetchAndUpdate; i++) {
			const url = urlsToFetchAndUpdate[i];
			const { urlIsNecessary, message } = necessaryUrlToGoAndFetch(
				url,
				urlHistory
			);
			if (urlIsNecessary) {
				const { additions, duplicates } = await updateLinkFromUrl(
					page,
					url
				);
				urlHistory.push(url);
				console.log(
					`[${i}/${urlsToFetchAndUpdate.length}] - added ${additions} from ${url} (${duplicates} duplicates).`
				);
			} else {
				console.log(
					`[${i}/${urlsToFetchAndUpdate.length}] - Skipped ${url}. Reason: ${message}`
				);
			}
		}
};

module.exports = fetchAndUpdateAllLinks;
