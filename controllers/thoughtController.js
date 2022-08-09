const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {

    // GET all thoughts
    getAllThoughts(req, res) {
        Thought
            .find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) =>
                res.status(500).json(err))
    },

    // GET thought by ID
    getThoughtById(req, res) {
        Thought
            .findOne({ _id: req.params.thoughtId })
            .then(async (thought) => !thought
                ? res.status(400).json({ message: "No Thought with this id" })
                : res.json(thought)
            ).catch((err) => res.status(500).json(err));
    },

    // CREATE thought
    createThought(req, res) {
        Thought
            .create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) =>
                res.status(500).json(err));
    },

    // UPDATE thought
    updateThought(req, res) {
        Thought
            .findOneAndUpdate({ _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true })
            .then((thought) => !thought
                ? res.status(400).json({ message: "No Thought with this id" })
                : res.json(thought)
            ).catch((err) =>
                res.status(500).json(err))
    },

    // DELETE thought
    deleteThought(req, res) {
        Thought
            .findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => !thought
                ? res.status(400).json({ message: "No Thought with this id" })
                : res.json({ message: "Thought deleted" })
            ).catch((err) =>
                res.status(500).json(err))
    },

    // ADD a reaction
    addReaction(req, res) {
        Thought
            .findOneAndUpdate({ _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },)
                .then((reaction) => !reaction
                ? res.status(404).json({ message: "No thought with this id" })
                : res.json(reaction))
                .catch((err) => res.status(500).json(err))
    },

    // REMOVE a reaction
    removeReaction(req, res) {
        Thought
            .findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params._id } } },
            )
            .then((reaction) => !reaction
                ? res.status(400).json({ message: "No reaction with this id" })
                : res.json({ message: "Reaction removed" })
            ).catch((err) => res.status(500).json(err));
    },

};