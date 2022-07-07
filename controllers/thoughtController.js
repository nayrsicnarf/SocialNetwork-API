const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // GET thought by ID
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // CREATE thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User
                    .findOneAndUpdate(
                        { _id: params.userId },
                        { $push: { thoughts: _id } },
                        { new: true });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // UPDATE thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // DELETE thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that ID" })
                    : res.json(thought)
            )
            .then(() => res.json({ message: "Thought deleted!" }))
            .catch((err) => res.status(500).json(err));
    },

    // ADD a reaction
    addReaction(req, res) {
        console.log("You are adding a reaction");
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: "No thought found with that ID :(" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // DELETE a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.params.id } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: "No thought found with that ID :(" })
                    : res.json(thoughtId)
            )
            .catch((err) => res.status(500).json(err));
    },
};