const router = require("express").Router();

const {
  deleteThought,
  updateThought,
  getAllThoughts,
  getThoughtById,
  createThought,
  removeReaction,
  addReaction
} = require("../../controllers/thoughtController");

router
  .route("/")                                 // /api/thought
  .get(getAllThoughts)                        // GET to get all thoughts
  .post(createThought);                       //POST to create new thoughts

router
  .route("/:thoughtId")                       // /api/:thoughtId
  .get(getThoughtById)                        // GET to get thoughts by ID
  .put(updateThought)                         // PUT to update thoughts by ID
  .delete(deleteThought);                     // DELETE to remove thoughts by ID

router
  .route("/:thoughtId/reactions")             // /api/thought/:thoughtId/reaction
  .post(addReaction);                         // POST to create reactions

router
  .route("/:thoughtId/reactions/:reactionId") // /api/thought/:thoughtId/reactions/reactionId
  .delete(removeReaction);                    // DELETE to remove reactions by ID

// Export module router
module.exports = router;