// @route POST api/reg
// @desc Reg user
// @access Dev only

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Admin = require('../../models/Admin');

const regUser = (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).json({ msg: 'Please enter all fields.' });

	Admin.findOne({ email })
		.then((admin) => {
			if (admin)
				return res
					.status(400)
					.json({ msg: 'Admin account already exist.' });
			const newAdmin = new Admin({
				email,
				password,
			});

			bcrypt.genSalt(10, (err, salt) => {
				if (err) {
					console.log(err);
					return res.status(500).json({
						msg:
							'Error while generating encryption salt. Please try again later.',
					});
				} else {
					bcrypt.hash(newAdmin.password, salt, (err, hash) => {
						if (err) {
							console.log(err);
							return res.status(500).json({
								msg:
									'Error while hashing. Please try again later.',
							});
						} else {
							newAdmin.password = hash;
							newAdmin
								.save()
								.then((admin) => {
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
											} else {
												return res.status(200).json({
													token,
													admin: {
														id: admin.id,
														email: admin.email,
													},
												});
											}
										}
									);
								})
								.catch((e) => {
									console.log(e);
									return res.status(500).json({
										msg:
											'Error while saving new Admin to database. Please try again later.',
									});
								});
						}
					});
				}
			});
		})
		.catch((e) => {
			console.log(e);
			return res.status(500).json({
				msg: 'Error accessing admin database, please try again later',
			});
		});
};

module.exports = regUser;
