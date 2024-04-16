const { User } = require('../models');
const { findOneAndUpdate } = require('../models/User');

module.exports = {
	async getUsers(req, res) {
		try {
			const users = await User.find();
			res.status(200).json(users);
			// res.status(200).json({ msg: 'nice' });
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
};
