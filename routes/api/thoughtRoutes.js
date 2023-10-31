const router = require('express').Router();
const {
    getAllThoughts,
    getSolitaryThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughtController')

router.route('/')
.get(getAllThoughts)
.post(createThought);

router.route('/:thoughtId')
.get(getSolitaryThought)
.post(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(createReaction)
.delete(removeReaction);

module.exports = router;