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
const AdminSchema = new Schema(schemaFields, schemaOptions);

const Admin = mongoose.model('Admins', AdminSchema);

module.exports = Admin;
