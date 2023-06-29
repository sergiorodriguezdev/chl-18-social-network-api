const router = require('express').Router();
// Import functions from thoughtController
const {
    getThoughts,
    getSingleThought,
    createThought,
    addReaction,
    updateThought,
    deleteThought,
    deleteReaction
} = require('../../controllers/thoughtController');

// Define routes
// /api/thoughts/
router.route('/')
    .get(getThoughts)   // GET
    .post(createThought);   // POST

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)  // GET
    .put(updateThought) // PUT
    .delete(deleteThought); // DELETE

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction); // POST

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);    // DELETE

module.exports = router;