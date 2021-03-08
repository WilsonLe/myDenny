const Visited = require('../../models/Visited');
require('dotenv').config();

const visited = async (url) => {
	const docs = await Visited.find({ url });
	if (docs.length == 0) return false;
	else return true;
};
export default visited;
