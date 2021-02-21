// @route POST api/auth
// @desc Auth user
// @access Public

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Admin = require('../../models/Admin');

const authAdmin = (req, res) => {
	const { email, password } = req.body;

	if (!email || !password)
		return res.status(400).json({ msg: 'Please enter all fields.' });

	Admin.findOne({ email })
		.then((admin) => {
			if (!admin)
				return res.status(400).json({ msg: 'Email does not exist' });

			// Validate password
			bcrypt
				.compare(password, admin.password)
				.then((isMatch) => {
					if (!isMatch)
						return res
							.status(400)
							.json({ msg: 'Email or password is invalid' });

					const id = { id: admin.id };
					const expirationTime = {
						expiresIn: process.env.JWT_EXPIRE,
					};

					jwt.sign(
						id,
						process.env.JWT_SECRET,
						expirationTime,
						(err, token) => {
							if (err) {
								console.log(err);
								return res.status(500).json({
									msg:
										'Error while generating token, please try again later.',
								});
							} else
								return res.status(200).json({
									token,
									admin: { id: admin.id, email: admin.email },
								});
						}
					);
				})
				.catch((e) => {
					console.log(e);
					return res.status(500).json({
						msg:
							'Error comparing password with database. Please try again later',
					});
				});
		})
		.catch((e) => {
			console.log(e);
			return res.status(500).json({
				msg: 'Error accessing admin database. Please try again later.',
			});
		});
};

module.exports = authAdmin;
