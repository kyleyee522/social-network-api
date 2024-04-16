const mongoose = require('mongoose');

const thoughtScehma = new mongoose.Schema({
	thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
	createdAt: { type: Date, default: Date.now },
	username: [],
	reactions: [],
});
