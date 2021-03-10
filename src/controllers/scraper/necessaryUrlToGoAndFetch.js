const logger = require('../../utils/logger');

const necessaryLinkToGoAndFetch = (currUrl) => {
	if (!currUrl.includes('http')) {
		logger.info(`${currUrl} does not includes http.`);
		return false;
	}

	const lastDir = currUrl.split('/')[currUrl.split('/').length - 1];
	if (lastDir.includes('.pdf')) {
		logger.info(`${currUrl} includes pdf extension.`);
		return false;
	}
	if (lastDir.includes('.csv')) {
		logger.info(`${currUrl} includes csv extension.`);
		return false;
	}
	if (lastDir.includes('.xlxs')) {
		logger.info(`${currUrl} includes xlxs extension.`);
		return false;
	}
	if (lastDir.includes('.docx')) {
		logger.info(`${currUrl} includes docx extension.`);
		return false;
	}
	if (!currUrl.includes('denison')) {
		logger.info(`${currUrl} does not include denison.`);
		return false;
	}
	if (currUrl.includes('logout')) {
		logger.info(`${currUrl} includes logout.`);
		return false;
	}
	if (currUrl.includes('google')) {
		logger.info(`${currUrl} includes google.`);
		return false;
	}
	if (currUrl.includes('youtube')) {
		logger.info(`${currUrl} includes youtube.`);
		return false;
	}
	if (currUrl.includes('facebook')) {
		logger.info(`${currUrl} includes facebook.`);
		return false;
	}
	if (currUrl.includes('instagram')) {
		logger.info(`${currUrl} includes instagram.`);
		return false;
	}
	if (currUrl.includes('twitter')) {
		logger.info(`${currUrl} includes twitter.`);
		return false;
	}
	if (currUrl.includes('vems.denison.edu')) {
		logger.info(`${currUrl} includes vems.denison.edu.`);
		return false;
	}

	return true;
};

module.exports = necessaryLinkToGoAndFetch;
