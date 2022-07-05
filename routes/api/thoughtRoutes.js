const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts);     // GET all thoughts

// /api/thoughts/:thoughtsId
router
  .route('/:id')
  .get(getThoughtsById)     // GET thoughts by ID
  .put(updateThoughts)      // PUT to update thoughts by ID
  .delete(deleteThoughts);  // DELETE to remove thoughts by ID

// api/thoughts/:userId/
router
  .route('/:userId')
  .post(createThoughts);    //POST to create new thoughts

// Export module router
module.exports = router;