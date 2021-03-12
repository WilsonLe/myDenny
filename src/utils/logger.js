const winston = require('winston');

require('dotenv').config();

const logger = winston.createLogger({
	levels: winston.config.syslog.levels,
	format: winston.format.simple(),
	transports: [new winston.transports.Console()],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `

module.exports = logger;
