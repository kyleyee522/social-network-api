const { User } = require('../models');
const { findOneAndUpdate } = require('../models/User');

module.exports = {
	async getUsers(req, res) {
		try {
			const users = await User.find();
			res.status(200).json(users);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async getOneUser(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId });
			if (!user) {
				return res.status(404).json({ message: 'No user with that ID' });
			}
			res.json(user);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	async createUser(req, res) {
		try {
			const userData = await User.create({
				username: req.body.username,
				email: req.body.email,
			});
			res.status(201).json(userData);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	async updateUser(req, res) {
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ username: req.body.username }
			);
			res.status(200).json(user);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	async deleteUser(req, res) {
		try {
			const result = await User.findOneAndDelete({ _id: req.params.userId });
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	async addFriend(req, res) {
		try {
			const friend = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $addToSet: { friends: req.params.friendId } },
				{ new: true }
			);
			!friend
				? res.status(404).json({
						message: 'Friend created, but found no user with that ID',
				  })
				: res.json(friend);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async deleteFriend(req, res) {
		try {
			const result = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $pull: { friends: req.params.friendId } },
				{ runValidators: true, new: true }
			);
			if (!result) {
				return res
					.status(404)
					.json({ message: 'No user found with that ID :(' });
			}

			res.json(result);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
};
