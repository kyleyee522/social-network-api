const router = require('express').Router();
const {
	getThoughts,
	createThought,
	getSingleThought,
} = require('../../controllers/thoughtController');

const { createReaction } = require('../../controllers/reactionController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought);

// Add a reaction to a thought
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

module.exports = router;
