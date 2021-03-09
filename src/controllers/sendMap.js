// @route GET api/map
// @desc send map data
// @access Private
const { v4: uuidv4 } = require('uuid');
// Link model
const Visited = require('../models/Visited');

const sendMap = async (req, res) => {
	const links = await Visited.find();

	let nodes = [];
	let edges = [];

	links.forEach((link) => {
		nodes.push({ id: link.url, label: link.url });
		const linkEdges = JSON.parse(link.edges);
		for (const edgeUrl in linkEdges)
			edges.push({ id: uuidv4(), source: link.url, target: edgeUrl });
	});

	console.log({ nodes, edges });
	return res.json({ nodes, edges });
};

module.exports = sendMap;
