const logger = require('../../utils/logger');

const login = async (page) => {
	await page.type('#username', process.env.NAME);
	await page.type('#password', process.env.PASSWORD);
	await page.click('button[type="submit"]');

	await (() => new Promise((res) => setTimeout(res, 3000)))();

	const frameHandle = await page.$('#duo_iframe');
	const frame = await frameHandle.contentFrame();
	await frame.click(
		'#auth_methods > fieldset > div.row-label.push-label > button'
	);
	await page.waitForSelector('#mydenison-header');
	logger.info('Logged in');
};
module.exports = login;
