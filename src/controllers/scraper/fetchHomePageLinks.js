require('dotenv').config();
const fetchHomePageLinks = async (browser) => {
	let homePageLinks = [];
	try {
		const page = await browser.newPage();
		await page.goto(process.env.BASE_URL);
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

		console.log('Loged in');

		const links = await page.$$('a');
		links.forEach((link) => {
			console.log(link);
			let text = link.textContent;
			text = text.replace(/\s+/g, ' ').trim();
			let url = link.href;
			homePageLinks.push({ text, url });
		});
		return homePageLinks;
		// const html = await page.content();

		// await page.close();

		// return html;
	} catch (error) {
		console.log(error);
	}
};

module.exports = fetchHomePageLinks;
