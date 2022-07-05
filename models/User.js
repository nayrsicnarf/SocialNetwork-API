const { Schema, Types } = require("mongoose");
const thoughtSchema = require("./Thought");
const reactionSchema = require("./Reaction");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      // Validate email using REGEX 
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },

    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: "Thought",
    }],

    friends: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],

  },

  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;