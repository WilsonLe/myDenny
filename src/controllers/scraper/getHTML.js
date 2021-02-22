const puppeteer = require('puppeteer');
require('dotenv').config();
const getHTML = async () => {
	try {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 25,
			args: [
				'--disable-web-security',
				'--disable-features=IsolateOrigins,site-per-process',
			],
		});
		const page = await browser.newPage();
		await page.goto(process.env.URL);
		await page.type('#username', process.env.USERNAME);
		await page.type('#password', process.env.PASSWORD);
		await page.click('button[type="submit"]');

		await (() => new Promise((res) => setTimeout(res, 5000)))();

		const frameHandle = await page.$('#duo_iframe');

		const frame = await frameHandle.contentFrame();

		await frame.click(
			'#auth_methods > fieldset > div.row-label.push-label > button'
		);
		await page.waitForSelector('#mydenison-header');
		
		const html = await page.content();
		// browser.close();
		return html;
	} catch (error) {
		console.log(error);
	}
};

module.exports = getHTML;
