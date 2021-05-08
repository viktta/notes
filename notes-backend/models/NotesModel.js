const mongoose = require('mongoose');
const User = require('./UserModel');

const NotesSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},

	note: {
		type: String,
		required: true
	},

	date: {
		type: Date,
		default: Date.now
	},

	user: [{ type: mongoose.Schema.Types.ObjectId, ref: User }]
});

module.exports = mongoose.model('Notes', NotesSchema);
