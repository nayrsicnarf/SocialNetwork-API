const { Schema, model } = require("mongoose");
const userSchema = require("./User");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of reactions
// ThoughtsSchema.virtual('reactionCount').get(function () {
//     return this.reactions.length;
// });

const Thought = model("thought", thoughtSchema);

// Export Thoughts Module
module.exports = Thought;