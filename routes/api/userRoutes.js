const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    addFriend
} = require('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getSingleUser);

router.route('/:userId/friends/:friendId')
    .post(addFriend);

module.exports = router;