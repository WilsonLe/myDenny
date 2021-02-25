require('dotenv').config();
const fetchHomePageLinks = async (page) => {
	let homePageLinks = [];

	try {
		await page.goto(process.env.BASE_URL);
		await page.type('#username', process.env.NAME);
		await page.type('#password', process.env.PASSWORD);
		await page.click('button[type="submit"]');

		await (() => new Promise((res) => setTimeout(res, 5000)))();

		const frameHandle = await page.$('#duo_iframe');

		const frame = await frameHandle.contentFrame();

		await frame.click(
			'#auth_methods > fieldset > div.row-label.push-label > button'
		);

		await page.waitForSelector('#mydenison-header');

		console.log('Logged in');

		const linksHandle = await page.$$('a');
		for (let i = 0; i < linksHandle.length; i++) {
			const linkHandle = linksHandle[i];
			const text = await page.evaluate(
				(el) => el.textContent,
				linkHandle
			);
			const url = await page.evaluate((el) => el.href, linkHandle);
			homePageLinks.push({ text, url });
		}
		return homePageLinks;
	} catch (error) {
		console.log(error);
	}
};

module.exports = fetchHomePageLinks;
