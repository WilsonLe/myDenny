const comparePrevCurrLinks = (prevLinksList, currLinksList) => {
	let currUrlList = currLinksList.map((currLink) => currLink.url);
	let prevUrlList = prevLinksList.map((prevLink) => prevLink.url);
	for (let i = 0; i < currUrlList.length; i++) {
		if (!prevUrlList.includes(currUrlList[i])) {
			return 'not identical';
		}
	}
	return 'identical';
};
module.exports = comparePrevCurrLinks;
