const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema config
const schemaFields = {
	email: String,
	password: String,
};

const schemaOptions = {
	timestamps: true,
};

// Create Schema
const LinkSchema = new Schema(schemaFields, schemaOptions);

const Link = mongoose.model('Links', LinkSchema);

module.exports = Link;
