const puppeteer = require('puppeteer');
const logger = require('../../utils/logger');

require('dotenv').config();

const initPuppeteer = async () => {
	const browser = await puppeteer.launch({
		headless: process.env.NODE_ENV == 'development' ? false : true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-web-security',
			'--disable-features=IsolateOrigins,site-per-process',
		],
	});
	const page = await browser.newPage();
	page.on('dialog', async (dialog) => {
		logger.info(`Got a dialog: ${dialog.message()}`);
		await dialog.dismiss();
	});

	return { page, browser };
};

module.exports = initPuppeteer;
