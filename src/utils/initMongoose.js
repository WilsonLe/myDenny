const mongoose = require('mongoose');
const logger = require('./logger');

require('dotenv').config();
// init mongoose
const initMongoose = () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})
		.then((result) => {
			logger.info('Connected to mongoDB server');
		})
		.catch((err) => {
			console.log(err.name);
		});
};

module.exports = initMongoose;
