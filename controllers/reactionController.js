const { Reaction, Thought } = require('../models');
const reactionSchema = require('../models/Reaction');

module.exports = {
	async createReaction(req, res) {
		try {
			// const reaction = await Reaction.create(req.body);
			const reaction = await reactionSchema.create(req.body);
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: reaction } },
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
