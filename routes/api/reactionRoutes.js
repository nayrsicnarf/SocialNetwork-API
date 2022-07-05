const router = require('express').Router();

const {
    addReaction,
    deleteReaction,
} = require('../../controllers/reactionsController');

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);         // POST to create reactions

// /api/thoughts/:thoughtId/reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);    // DELETE to remove reactions by ID

// Export module router
module.exports = router;