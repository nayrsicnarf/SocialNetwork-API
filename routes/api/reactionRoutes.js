const router = require('express').Router();

const {
    addReaction,
    deleteReaction,
} = require('../../controllers/reactionsController');

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

// Export module router
module.exports = router;