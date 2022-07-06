const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require("../../controllers/userController");

router
  .route('/')                        // /api/user
  .get(getAllUsers)                  // GET to get all users
  .post(createUser);                 // POST to create new user(s)

router
  .route('/:id')                     // /api/user/:id
  .get(getUserById)                  // GET to get user by ID
  .put(updateUser)                   // PUT to update user by ID
  .delete(deleteUser);               // DELETE to remove user by ID


router
  .route('/:id/friends/:friendId')    // /api/user/:userId/friends/:friendId
  .post(addFriend)                    // POST to add new friend
  .delete(deleteFriend)               // DELETE to remove friend

// Export module router
module.exports = router; 