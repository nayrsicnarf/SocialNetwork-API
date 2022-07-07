const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
    // GET all users
    getAllUsers(req, res) {
        User.find()
            // .populate({ path: 'thoughts', select: '-__v' })
            // .populate({ path: 'friends', select: '-__v' })
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // GET user by ID
    getUserById(req, res) {
        console.log(req)
        User.findOne({ _id: req.params.id })
            // .populate({ path: 'thoughts', select: '-__v' })
            // .populate({ path: 'friends', select: '-__v' })
            .select("-__v")
            .then((user) => {
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.json(user)
            }
            )
            .catch((err) => res.status(500).json(err));
    },

    // CREATE user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // DELETE user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: "User and thoughts deleted!" }))
            .catch((err) => res.status(500).json(err));
    },

    // UPDATE user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this ID." })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // ADD a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .populate({ path: "friends", select: ("-__v") })
            .select("-__v")
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: "No user found with that ID." })
                    : res.json(user)
            )
            .catch((err) => res.json(err));
    },

    // DELETE a friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .populate({ path: "friends", select: "-__v" })
            .select("-__v")
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: "No user found with that ID." })
                    : res.json(user)
            )
            .then(() => res.json({ message: "Friend had been removed!" }))
            .catch((err) => res.json(err));
    },

};