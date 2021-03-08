const updateLinkFromUrl = require('./updateLinkFromUrl');
const necessaryUrlToGoAndFetch = require('./necessaryUrlToGoAndFetch');
const compareUrl = require('./compareUrl');
const initPuppeteer = require('./initPuppeteer');
const NewLink = require('../../models/NewLink');
const Link = require('../../models/Link');
const fetchAndUpdateAllLinks = async () => {
	await NewLink.remove({});
	await NewLink.insertMany(await Link.find());

	let urlHistory = [process.env.BASE_URL];
	const page = await initPuppeteer(); // page is tab
	await updateLinkFromUrl(page, process.env.BASE_URL); // fetch and update dtb from BASE_URL

	let linksToFetchAndUpdate = await NewLink.find();
	let urlsToFetchAndUpdate = linksToFetchAndUpdate.map((link) => link.url); // array of just url from NewLink model

	while (compareUrl(urlHistory, urlsToFetchAndUpdate) == 'not identical') {
		// console.log(urlsToFetchAndUpdate);
		for (let i = 0; i < urlsToFetchAndUpdate.length; i++) {
			const t0 = new Date().getTime(); // start time measure
			const url = urlsToFetchAndUpdate[i];
			const { urlIsNecessary, message } = necessaryUrlToGoAndFetch(
				url,
				urlHistory
			);
			if (urlIsNecessary) {
				try {
					const { additions, duplicates } = await updateLinkFromUrl(
						page,
						url
					);
					urlHistory.push(url);
					const t1 = new Date().getTime(); // end time measure
					console.log(
						`[${i}/${
							urlsToFetchAndUpdate.length
						}] - added ${additions} from ${url} (${duplicates} duplicates). Took ${
							t1 - t0
						}ms.`
					);
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log(
					`[${i}/${urlsToFetchAndUpdate.length}] - Skipped ${url}. Reason: ${message}`
				);
			}
		}
		linksToFetchAndUpdate = await NewLink.find();
		urlsToFetchAndUpdate = linksToFetchAndUpdate.map((link) => link.url);
	}

	await NewLink.remove({});
	console.log(`Successfully updated databases with ${newLinks.length} links`);
};

module.exports = fetchAndUpdateAllLinks;
