const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router
  .route('/')                                 // /api/thoughts
  .get(getAllThoughts);                       // GET to get all thoughts

router
  .route('/:id')                              // /api/thoughts/:id
  .get(getThoughtById)                        // GET to get thoughts by ID
  .put(updateThought)                         // PUT to update thoughts by ID
  .delete(deleteThought);                     // DELETE to remove thoughts by ID

router
  .route('/:userId')                          // api/thought/:userId
  .post(createThought);                       //POST to create new thoughts

router
  .route('/:thoughtId/reactions')             // /api/thought/:thoughtId/reaction
  .post(addReaction);                         // POST to create reactions

router
  .route('/:thoughtId/reactions/:reactionId') // /api/thought/:thoughtId/reactionId
  .delete(deleteReaction);                    // DELETE to remove reactions by ID

// Export module router
module.exports = router;