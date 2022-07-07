const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");

    // Drop existing users
    await User.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Create empty array to hold the users
    const users = [{}];

    // Create empty array to hold the thoughts
    const thoughts = [{}];

    // Add users to the collection and await the results
    await User.collection.insertMany(users);

    // Add thoughts to the collection and await the results
    await Thought.collection.insertMany(thoughts);

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.table(thoughts);
    console.info("Seeding Complete. 🌱");
    process.exit(0);
});