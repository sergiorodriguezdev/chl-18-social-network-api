const router = require('express').Router();
// Import functions from userController
const {
    getUsers,
    getSingleUser,
    createUser,
    addFriend,
    updateUser,
    deleteUser,
    unfriend
} = require('../../controllers/userController');

// Define routes
// /api/users/
router.route('/')
    .get(getUsers)  // GET
    .post(createUser);  // POST

// /api/users/:userId
router.route('/:userId')
    .get(getSingleUser) // GET
    .put(updateUser)    // PUT
    .delete(deleteUser);    // DELETE

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)    // POST
    .delete(unfriend);  // DELETE

module.exports = router;