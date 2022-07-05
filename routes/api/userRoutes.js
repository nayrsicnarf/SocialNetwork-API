const router = require('express').Router();

const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// /api/users
router
  .route('/')
  .get(getAllUsers)       // GET all users
  .post(createUsers);     // POST new user(s)

// /api/users/:id
router
  .route('/:id')
  .get(getUsersById)      // GET user by ID
  .put(updateUsers)       // PUT to update user by ID
  .delete(deleteUsers);   // DELETE to remove user by ID

// /api/users/:userId/friends/:friendId
router
  .route('/:id/friends/:friendId')
  .post(addFriend)        // POST to add new friend
  .delete(deleteFriend)   // DELETE to remove friend

// Export module router
module.exports = router; 