require('dotenv').config();
const threadify = (currLinksList) => {
	let threads = [];
	const currLinksLength = currLinksList.length;
	const noThreads = process.env.NO_THREAD;
	for (let i = 0; i < noThreads; i++) {
		if (i != noThreads - 1) {
			let tempThread = currLinksList.splice(0, currLinksLength / 5);
			threads.push(tempThread);
		} else {
			threads.push(currLinksList);
		}
	}
	return threads;
};

module.exports = threadify;
