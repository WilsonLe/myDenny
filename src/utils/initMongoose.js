const mongoose = require('mongoose');
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
			console.log('Connected to mongoDB server');
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = initMongoose;
