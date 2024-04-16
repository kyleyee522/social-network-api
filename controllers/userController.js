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
};
