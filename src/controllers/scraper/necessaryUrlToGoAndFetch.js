const logger = require('../../utils/logger');
require('dotenv').config();

const necessaryLinkToGoAndFetch = (currUrl, length) => {
	if (!currUrl.includes('http')) {
		logger.info(`${length} left - ${currUrl} does not includes http`);
		return false;
	}

	const lastDir = currUrl.split('/')[currUrl.split('/').length - 1];
	if (lastDir.includes('.pdf')) {
		logger.info(`${length} left - ${currUrl} includes pdf extension`);
		return false;
	}
	if (lastDir.includes('.csv')) {
		logger.info(`${length} left - ${currUrl} includes csv extension`);
		return false;
	}
	if (lastDir.includes('.xlxs')) {
		logger.info(`${length} left - ${currUrl} includes xlxs extension`);
		return false;
	}
	if (lastDir.includes('.docx')) {
		logger.info(`${length} left - ${currUrl} includes docx extension`);
		return false;
	}
	if (lastDir.includes('.png')) {
		logger.info(`${length} left - ${currUrl} includes png extension`);
		return false;
	}
	if (lastDir.includes('.jpg')) {
		logger.info(`${length} left - ${currUrl} includes jpg extension`);
		return false;
	}
	if (lastDir.includes('.jpeg')) {
		logger.info(`${length} left - ${currUrl} includes jpeg extension`);
		return false;
	}
	if (lastDir.includes('.dmg')) {
		logger.info(`${length} left - ${currUrl} includes dmg extension`);
		return false;
	}
	if (lastDir.includes('.zip')) {
		logger.info(`${length} left - ${currUrl} includes zip extension`);
		return false;
	}
	if (lastDir.includes('.exe')) {
		logger.info(`${length} left - ${currUrl} includes exe extension`);
		return false;
	}
	if (lastDir.includes('.pkg')) {
		logger.info(`${length} left - ${currUrl} includes pkg extension`);
		return false;
	}

	if (!currUrl.includes('denison')) {
		logger.info(`${length} left - ${currUrl} does not include denison`);
		return false;
	}
	if (currUrl.includes('logout')) {
		logger.info(`${length} left - ${currUrl} includes logout`);
		return false;
	}
	if (currUrl.includes('google')) {
		logger.info(`${length} left - ${currUrl} includes google`);
		return false;
	}
	if (currUrl.includes('youtube')) {
		logger.info(`${length} left - ${currUrl} includes youtube`);
		return false;
	}
	if (currUrl.includes('facebook')) {
		logger.info(`${length} left - ${currUrl} includes facebook`);
		return false;
	}
	if (currUrl.includes('instagram')) {
		logger.info(`${length} left - ${currUrl} includes instagram`);
		return false;
	}
	if (currUrl.includes('twitter')) {
		logger.info(`${length} left - ${currUrl} includes twitter`);
		return false;
	}
	if (currUrl.includes('zoom')) {
		logger.info(`${length} left - ${currUrl} includes zoom`);
		return false;
	}
	if (currUrl.includes('vems.denison.edu')) {
		logger.info(`${length} left - ${currUrl} includes vems.denison.edu`);
		return false;
	}
	if (currUrl.includes('@')) {
		logger.info(`${length} left - ${currUrl} includes @`);
		return false;
	}
	if (!currUrl.startsWith(process.env.BASE_URL)) {
		logger.info(
			`${length} left - ${currUrl} does not start with ${process.env.BASE_URL}`
		);
		return false;
	}
	if (
		!currUrl.startsWith(process.env.BASE_URL) &&
		!currUrl.startsWith('https://banner.denison.edu') &&
		!currUrl.startsWith('https://myaid.denison.edu') &&
		!currUrl.startsWith('https://mywellness.denison.edu') &&
		!currUrl.startsWith('https://my.iss.denison.edu') &&
		!currUrl.startsWith(
			'https://denison.datacenter.adirondacksolutions.com'
		)
	) {
		logger.info(
			`${length} left - ${currUrl} does not start with base urls`
		);
		return false;
	}
	return true;
};

module.exports = necessaryLinkToGoAndFetch;
