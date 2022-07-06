const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

router
  .route('/')              // /api/thoughts
  .get(getAllThoughts);    // GET to get all thoughts

router
  .route('/:id')           // /api/thought/:thoughtsId
  .get(getThoughtById)     // GET to get thoughts by ID
  .put(updateThought)      // PUT to update thoughts by ID
  .delete(deleteThought);  // DELETE to remove thoughts by ID

router
  .route('/:userId')       // api/thought/:userId
  .post(createThought);    //POST to create new thoughts

// Export module router
module.exports = router;