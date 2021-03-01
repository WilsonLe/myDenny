const { visited, willVisit } = require('../../utils/initRedis')();

require('dotenv').config();

const fetchAndUpdateAllLinks = async () => {
	visited.set('key1', 'hello world');
	visited.get('key1', (e, v) => console.log(v));
	willVisit.get('key1', (e, v) => console.log(v));
};

module.exports = fetchAndUpdateAllLinks;
