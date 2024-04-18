const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const { virtuals } = require('./Reaction');

const userSchema = new Schema(
	{
		username: { type: String, required: true, unique: true, trim: true },
		email: {
			type: String,
			required: true,
			unique: true,
			validate: [isEmail, 'Invalid email'],
		},
		thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
		friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	},
	{ toJSON: { virtuals: true }, id: false }
);

userSchema.virtual('friendsCount').get(function () {
	return this.friends.length;
});

const User = model('user', userSchema);

// const userData = []

// User.create({ username: 'User 1', email: 'user1@email.com' })
// 	.then((data) => console.log(data))
// 	.catch((err) => console.error(err));

// User.create({ username: 'User 2', email: 'user2@email.com' })
// 	.then((data) => console.log(data))
// 	.catch((err) => console.error(err));

// User.create({ username: 'User 3', email: 'user3@email.com' })
// 	.then((data) => console.log(data))
// 	.catch((err) => console.error(err));

module.exports = User;
