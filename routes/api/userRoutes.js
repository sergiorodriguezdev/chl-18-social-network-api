const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    addFriend,
    updateUser
} = require('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser);

router.route('/:userId/friends/:friendId')
    .post(addFriend);

module.exports = router;