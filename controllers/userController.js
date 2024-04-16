const { User } = require('../models');

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
};
