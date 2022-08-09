const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
    // FIND all users
    findAllUsers(req, res) {
        User
            .find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },

    // FIND user by ID
    findUserById(req, res) {
        User
            .findOne({ _id: req.params.userId })
            .then(async (user) => !user
                ? res.status(400).json({ message: "No User with this id" })
                : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // CREATE user
    createUser(req, res) {
        User
            .create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // DELETE user
    deleteUser(req, res) {
        User
            .findOneAndDelete({ _id: req.params.userId })
            .then((user) => !user
                ? res.status(400).json({ message: "No User with this id" })
                : res.json({ message: "User deleted" }))
            .catch((err) =>
                res.status(500).json(err))
    },

    // UPDATE user
    updateUser(req, res) {
        User
            .findOneAndUpdate({ _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true })
            .then((user) => !user
                ? res.status(400).json({ message: "No User with this Id" })
                : res.json(user))
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err)
            })
    },

    // ADD a friend
    addFriend(req, res) {
        User
            .findOneAndUpdate({ _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true })
            .then((friends) => res.json(friends))
            .catch((err) => res.status(500).json(err));
    },

    // REMOVE a friend
    removeFriend(req, res) {
        User
            .findOneAndUpdate({ _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true })
            .then((friend) => !friend
                ? res.stauts(400).json({ message: "No User with this Id" })
                : res.json({ message: "Friend deleted" }))
            .catch((err) => res.status(500).json(err));
    },

};