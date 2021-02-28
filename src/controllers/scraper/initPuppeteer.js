const puppeteer = require('puppeteer');
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
		console.log('Got a dialog');
		console.log(dialog.message());
		await dialog.dismiss();
	});

	return page;
};

module.exports = initPuppeteer;
