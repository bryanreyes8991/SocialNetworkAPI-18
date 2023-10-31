const { Thought, User } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSolitaryThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with that ID'})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addtoset: { thoughts: thought._id} },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({
                    message: 'Created thought, No User Id found',
                })
            }
            res.json('Created Thought Successfully');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thoughts associated with this Id'});
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thoughts associated with this Id'});
            }
            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user associated with this Id'});
            }
            res.json({ message: 'Thought Deleted'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No reactions with this Id'});
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.body } },
                {runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No reactions with this Id'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};