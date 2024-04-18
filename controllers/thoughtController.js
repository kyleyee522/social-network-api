const { ObjectId } = require('mongoose').Types;
// const {
// 	Types: { ObjectId },
// } = require('mongoose');
const { Thought, User } = require('../models');
// const { ObjectId } = require('mongoose').Types;

const deleteThoughtFromUser = async (username) =>
	User.aggregate([
		{
			$match: { username: username },
		},
	]);

module.exports = {
	async getThoughts(req, res) {
		try {
			const thoughts = await Thought.find();
			res.status(200).json(thoughts);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async getSingleThought(req, res) {
		try {
			const thought = await Thought.findOne({ _id: req.params.thoughtId });
			if (!thought) {
				return res.status(404).json({ message: 'No thought with that ID' });
			}
			res.json(thought);
			// res.json(thought);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async createThought(req, res) {
		try {
			const thought = await Thought.create(req.body);
			const user = await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $addToSet: { thoughts: thought._id } },
				{ new: true }
			);
			!user
				? res.status(404).json({
						message: 'Thought created, but found no user with that ID',
				  })
				: res.json('Created the Thought 🎉');
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async addReaction(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: req.body } },
				// Need to run validators or else it will not check whether the keys are correct in req.body
				{ runValidators: true, new: true }
			);
			if (!thought) {
				return res.status(404).json({ message: 'No thought with this id!' });
			}
			res.json(thought);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async updateThought(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ thoughtText: req.body.thoughtText },
				{ runValidators: true, new: true }
			);
			if (!thought) {
				return res.status(404).json({ message: 'No thought with this id!' });
			}
			res.json(thought);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	async deleteThought(req, res) {
		try {
			const result = await Thought.findOneAndDelete({
				_id: req.params.thoughtId,
			});
			const user = await deleteThoughtFromUser(result.username);
			const deleteThought = await User.findOneAndUpdate(
				{ _id: user[0]._id },
				{ $pull: { thoughts: result._id } },
				{ new: true }
			);
			if (!result) {
				return res
					.status(404)
					.json({ message: 'This thought does not exist!' });
			}
			res.json(deleteThought);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
};
