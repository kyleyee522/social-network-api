const { Reaction, Thought } = require('../models');

module.exports = {
	async createReaction(req, res) {
		try {
			const reaction = await Reaction.create(req.body);
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: reaction._id } },
				{ new: true }
			);
			!thought
				? res.status(404).json({
						message: 'Reaction created, but found no thought with that ID',
				  })
				: res.json('Created the Reaction 🎉');
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
};
