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
  .get(getAllThoughts);

// /api/thoughts/:thoughtsId
router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

// api/thoughts/:userId/
router
  .route('/:userId')
  .post(createThoughts);

// Export module router
module.exports = router;