const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // GET thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this ID." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // CREATE thought
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User
                    .findOneAndUpdate(
                        { _id: params.userId },
                        { $push: { thoughts: _id } },
                        { new: true });
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this ID." })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // UPDATE thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, body,
            { runValidators: true, new: true }
        )
            .select('-___v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this ID." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // DELETE thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this ID." })
                    : Thought.deleteOne({ _id: params.id })
            )
            .then(() => res.json({ message: "Thought deleted!" }))
            .catch((err) => res.status(500).json(err));
    },

    // ADD a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { runValidators: true, new: true }
        )
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: "No thought found with this ID." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // DELETE a reaction
    deleteReaction(req, res) {
        console.log(req)
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId } },
            { new: true }
        )

            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: "No reaction found with this ID." })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

};