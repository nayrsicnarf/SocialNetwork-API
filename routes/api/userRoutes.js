const router = require("express").Router();

const {
    deleteUser,
    updateUser,
    findAllUsers,
    findUserById,
    createUser,
    removeFriend,
    addFriend
} = require("../../controllers/userController");

router
  .route("/")                        // /api/user
  .get(findAllUsers)                 // GET to get all users
  .post(createUser);                 // POST to create new user(s)

router
  .route("/:userId")                 // /api/user/:id
  .get(findUserById)                 // GET to get user by ID
  .put(updateUser)                   // PUT to update user by ID
  .delete(deleteUser);               // DELETE to remove user by ID


router
  .route("/:userId/friends/:friendId")    // /api/user/:userId/friends/:friendId
  .post(addFriend)                    // POST to add new friend
  .delete(removeFriend)               // DELETE to remove friend

// Export module router
module.exports = router; 