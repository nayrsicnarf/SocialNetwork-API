const { Schema, model } = require("mongoose");

//Schema for the User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validator: {
                $jsonSchema: {
                    email: { $regex: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ },
                },
            },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },],
    },
    {
        toJson: {
            virtuals: true,
        }
    }
);

userSchema
    .virtual('friendCount')
    .get(function ()
    {
        return this.friends.length;
    });

const User = model("user", userSchema);

module.exports = User;