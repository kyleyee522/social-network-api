const router = require('express').Router();
const {
	getThoughts,
	createThought,
	getSingleThought,
	addReaction,
	deleteReaction,
	updateThought,
	deleteThought,
} = require('../../controllers/thoughtController');

// const { createReaction } = require('../../controllers/reactionController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
router
	.route('/:thoughtId')
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought);

// Add a reaction to a thought
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
