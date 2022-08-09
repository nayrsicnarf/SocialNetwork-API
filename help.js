const { User } = require("../models");

module.exports = {

    deleteUser(req, res)
    {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => !user
                ? res.status(400).json({ message: "No User at this id" })
                : res.json({ message: "GoodBye User" })
            ).catch((err) =>
                res.status(500).json(err))
    },

    updateUser(req, res)
    {
        User.findOneAndUpdate({ _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((user) => !user
                ? res.status(400).json({ message: "No User at this Id" })
                : res.json(user)
            ).catch((err) =>
            {
                console.log(err)
                return res.status(500).json(err)
            })
    },

    findAllUsers(req, res)
    {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },

    findUserById(req, res)
    {
        User.findOne({ _id: req.params.userId })
            .then(async (user) => !user
                ? res.status(400).json({ message: "No User at this id" })
                : res.json(user)
            ).catch((err) => res.status(500).json(err));
    },

    createUser(req, res)
    {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) =>
                res.status(500).json(err));
    },

    removeFriend(req, res)
    {
        User.findOneAndUpdate({ _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        ).then((friend) => !friend
            ? res.stauts(400).json({ message: "No User at this Id" })
            : res.json({ message: "goodbye friend" })
        ).catch((err) => res.status(500).json(err));
    },

    addFriend(req, res)
    {
        User.findOneAndUpdate({ _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        ).then((friends) => res.json(friends)
        ).catch((err) => res.status(500).json(err));
    }
}