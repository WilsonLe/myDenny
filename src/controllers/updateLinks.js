// @route POST api/links/click
// @desc post upate link by url and update its time
// @access Public

// Link model
const OfficialLink = require('../models/OfficialLink');

const updateLinks = async (req, res) => {
	try {
		const url = req.body;
		const currentTime = Date.now();

		const timeRange = 1000 * 60 * 60 * 24 * 7;

		let time = {};
		time[currentTime] = 1;

		const link = await OfficialLink.findOne(url);

		let timeClick = JSON.parse(link.timeClick);

		for (const time in timeClick)
			if (currentTime - parseInt(time) > timeRange)
				delete timeClick[time];

		timeClick = { ...timeClick, ...time };

		link['timeClick'] = JSON.stringify(timeClick);

		link['click'] = Object.keys(timeClick).length;

		await OfficialLink.findOneAndUpdate(url, link);

		return res.json(link);
	} catch (error) {
		console.log(error);
		return res.status(500).end();
	}
};

module.exports = updateLinks;
