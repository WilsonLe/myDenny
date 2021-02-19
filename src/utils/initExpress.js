'use strict';
const express = require('express');
const path = require('path');
const toHTTPS = require('../controllers/toHTTPS.js').redirectToHTTPS;
require('dotenv').config();

const initExpress = () => {
	const app = express();
	app.set('trust proxy', 1); // allow limiter to work on heroku
	app.use(express.json());
	process.env.NODE_ENV === 'production' && app.use(toHTTPS());

	// serve
	app.use(express.static('client/build'));
	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
		)
	);

	const port = process.env.PORT || 5000;

	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
};

module.exports = initExpress;
