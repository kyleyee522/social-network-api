const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, trim: true },
	email: { type: String, required: true, unique: true },
	thoughts: [],
	friends: [],
});

const User = mongoose.model('User', userSchema);

// const userData = []

User.create({ username: 'User 1', email: 'user1@email.com' })
	.then((data) => console.log(data))
	.catch((err) => console.error(err));

User.create({ username: 'User 2', email: 'user2@email.com' })
	.then((data) => console.log(data))
	.catch((err) => console.error(err));

User.create({ username: 'User 3', email: 'user3@email.com' })
	.then((data) => console.log(data))
	.catch((err) => console.error(err));

module.exports = User;
