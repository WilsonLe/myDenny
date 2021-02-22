const fs = require('fs');
const getHTML = require('./getHTML');
const extractLinks = require('./extractLinks');
const cleanLinks = require('./cleanLinks');
const compareLinks = require('./compareLinks');
const updateLinks = require('./updateLinks');
require('dotenv').config();

const initScraper = async () => {
	const html = await getHTML();
	let links = extractLinks(html); // Add while loop to fetch all links.
	links = cleanLinks(links);
	const changes = await compareLinks(links); // Add comparison algo
	console.log(changes);
	// await updateLinks(changes); // Add update algo
};

module.exports = initScraper;
