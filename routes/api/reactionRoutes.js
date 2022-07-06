const router = require('express').Router();

const {
    addReaction,
    deleteReaction,
} = require('../../controllers/reactionController');

router
    .route('/:thoughtId/reactions')                 // /api/thought/:thoughtId/reaction
    .post(addReaction);                             // POST to create reactions

router
    .route('/:thoughtId/reactions/:reactionId')     // /api/thought/:thoughtId/reactionId
    .delete(deleteReaction);                        // DELETE to remove reactions by ID

// Export module router
module.exports = router;