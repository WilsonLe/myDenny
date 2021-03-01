const compareUrls = (visitedLinks, willVisitLinks) => {
	for (let key in visitedLinks) {
		if (typeof willVisitLinks[key] == undefined) {
			return 'not identical';
		}
	}
	return 'identical';
};
module.exports = compareUrls;
