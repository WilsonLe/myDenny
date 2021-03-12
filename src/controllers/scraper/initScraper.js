const Visited = require('../../models/Visited');
const logger = require('../../utils/logger');

const visited = require('./visited');
const necessaryUrlToGoAndFetch = require('./necessaryUrlToGoAndFetch');
const initPuppeteer = require('./initPuppeteer');
const checkLogin = require('./checkLogin');
const login = require('./login');
const handleParser = require('./handleParser');
const cleanUrl = require('./cleanUrl');
const validNextUrl = require('./validNextUrl');

require('dotenv').config();

const initScraper = async (req, res) => {
	const { page, browser } = await initPuppeteer();
	res.status(200).end();
	try {
		// remove collection for testing
		await Visited.remove();

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
			let toVisitLength = toVisit.length;
			try {
				const { url, text, edges } = toVisit.pop(); // get last element
				const currUrl = url; // create currUrl as alias for url extracted from last element

				if (await visited(currUrl)) {
					logger.info(`${currUrl} already visited`);
					continue;
				}
				if (!currUrl) {
					logger.info(`${currUrl} does not exist`);
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
				let additions = 0;
				let visiteds = 0;
				for (let i = 0; i < linksHandle.length; i++) {
					const linkHandle = linksHandle[i];
					let { nextUrl, text } = await handleParser(
						linkHandle,
						page
					);

					if (!validNextUrl(nextUrl)) continue;

					// FIXME
					nextUrl = cleanUrl(nextUrl);

					if (await visited(nextUrl)) {
						const link = await Visited.findOne({ url: nextUrl });
						const edges = JSON.parse(link.edges);
						edges[currUrl] = 1;
						link['edges'] = JSON.stringify(edges);
						await Visited.findOneAndUpdate({ url: nextUrl }, link);
						visiteds++;
					} else {
						let edges = {};
						edges[currUrl] = 1;
						toVisit.push({
							url: nextUrl,
							text,
							edges: JSON.stringify(edges),
						});
						additions++;
					}
				}
				logger.info(
					`${toVisitLength} left - ${currUrl} - ${additions} additions - ${visiteds} visiteds`
				);
				await new Visited({
					url: currUrl,
					text,
					edges,
					click: 0,
					timeClick: '{}',
				}).save();
			} catch (error) {
				logger.error(error);
				continue;
			}
		}
		await page.close();
		await browser.close();
	} catch (error) {
		// await page.close();
		// await browser.close();
		console.log(error);
		logger.error(error);
	}
};

module.exports = initScraper;
