const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema config
const schemaFields = {
	url: { type: String, required: true },
	text: String,
	timeClick: String,
	click: Number,
	edges: String,
};

const schemaOptions = {};

// Create Schema
const LinkSchema = new Schema(schemaFields, schemaOptions);

const RedisLink = mongoose.model('RedisLinks', LinkSchema);

module.exports = RedisLink;
