const { Thought } = require("../models");

module.exports = {

    deleteThought(req, res)
    {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => !thought
                ? res.status(400).json({ message: "No Thought at this id" })
                : res.json({ message: "GoodBye Thought" })
            ).catch((err) =>
                res.status(500).json(err))
    },

    updateThought(req, res)
    {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true })
            .then((thought) => !thought
                ? res.status(400).json({ message: "No Thought at this id" })
                : res.json(thought)
            ).catch((err) =>
                res.status(500).json(err))
    },

    getAllThoughts(req, res)
    {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) =>
                res.status(500).json(err))
    },

    getThoughtById(req, res)
    {
        Thought.findOne({ _id: req.params.thoughtId })
            .then(async (thought) => !thought
                ? res.status(400).json({ message: "No Thought at this id" })
                : res.json(thought)
            ).catch((err) => res.status(500).json(err));
    },

    createThought(req, res)
    {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) =>
                res.status(500).json(err));
    },

    removeReaction(req, res)
    {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params._id } } },
            //{ runValidators: true, new: true }
        )
            .then((reaction) => !reaction
                ? res.status(400).json({ message: "No reaction at this id" })
                : res.json({ message: "Goodbye reaction" })
            ).catch((err) => res.status(500).json(err));
    },
    addReaction(req, res)
    {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            //{ runValidators: true, new: true }
        ).then((reaction) => !reaction
            ? res.status(404).json({ message: "No thought at this id" })
            : res.json(reaction)
        ).catch((err) => res.status(500).json(err))
    }
};