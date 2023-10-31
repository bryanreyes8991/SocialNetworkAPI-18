const { User, Thought } = require('.../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSolitaryUser(req, res) {
        try {
            const user = User.findone({ _id: req.params.userId })
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No User Id found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body }
                { runValidators: true, new : true }
            );
            if (!user) {
                res.status(404).json({ message: 'No User Id found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No User Id found' });
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts}});
            res.json({ message: 'User and related Thoughts deleted.'})
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        console.log('Added a friend');
        console.log(req.body);
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No User Id found' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId }
                { $pull: { friends: { friends: req.params.friends } } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No User Id found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { friends: req.params.friends } } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No User Id Found'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
