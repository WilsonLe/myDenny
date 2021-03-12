const logger = require('../utils/logger');
// @route POST api/rebot
// @desc Reboot server
// @access Private
const reboot = async (req, res) => {
	setTimeout(() => {
		// When NodeJS exits
		process.on('exit', function () {
			require('child_process').spawn(process.argv.shift(), process.argv, {
				cwd: process.cwd(),
				detached: true,
				stdio: 'inherit',
			});
		});
		process.exit();
	}, 1000);
	logger.info(`Server Rebooting...`);
	res.status(200).end();
};

module.exports = reboot;
