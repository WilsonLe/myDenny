const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema config
const schemaFields = {
	url: { type: String, unique: true, required: true },
	text: String,
};

const schemaOptions = {};

// Create Schema
const LinkSchema = new Schema(schemaFields, schemaOptions);

const OfficialLink = mongoose.model('OfficialLinks', LinkSchema);

module.exports = OfficialLink;
