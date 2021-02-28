const compareUrl = (urlHistory, urlsToFetchAndUpdate) => {
	let status = 'identical';
	urlsToFetchAndUpdate.forEach((url) =>
		!urlHistory.includes(url) ? (status = 'not identical') : null
	);
	return status;
};
module.exports = compareUrl;
