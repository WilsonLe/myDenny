const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkIsAuth = (req, res, next) => {
	const token = req.headers['authorization'];
	// Check for token
	if (!token)
		return res.status(401).json({ msg: 'No token, authorization denied.' });
	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Add user from payload
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).json({ msg: 'Token is not valid.' });
	}
};

module.exports = checkIsAuth;
