// Data to be seeded
const data = [
  {
    username: "michael.scott",
    email: "michael.scott@dm.com",
  },
  {
    username: "toby.flenderson",
    email: "toby.flenderson@dm.com",
  },
  {
    username: "creed.bratton",
    email: "creed.bratton@dm.com",
  },
  {
    username: "stanley.hudson",
    email: "stanley.hudson@dm.com",
  },
  {
    username: "phyllis.vance",
    email: "phyllis.vance@dm.com",
  },
  {
    username: "dwight.schrute",
    email: "dwight.schrute@dm.com",
  },
  {
    username: "jim.halpert",
    email: "jim.halpert@dm.com",
  },
  {
    username: "angela.schrute",
    email: "angela.schrute@dm.com",
  },
  {
    username: "oscar.martinez",
    email: "oscar.martinez@dm.com",
  },
  {
    username: "pam.halpert",
    email: "pam.halpert@dm.com",
  },
  {
    username: "meredith.palmer",
    email: "meredith.palmer@dm.com",
  },
  {
    username: "kelly.kapoor",
    email: "kelly.kapoor@dm.com",
  },
  {
    username: "andrew.bernard",
    email: "andrew.bernard@dm.com",
  },
  {
    username: "darryl.philbin",
    email: "darryl.philbin@dm.com",
  },
  {
    username: "kevin.malone",
    email: "kevin.malone@dm.com",
  },
  {
    username: "ryan.howard",
    email: "ryan.howard@dm.com",
  },
  {
    username: "erin.hannon",
    email: "erin.hannon@dm.com",
  },
];

const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (error) => error);

// Open connection to MongoDB instance
connection.once("open", async () => {
  console.log("Connected to MongoDB instance.");

  // Delete users collection
  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  // Delete thoughts collection
  let thoughtsCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection("thoughts");
  }

  // Create a single thought document
  const michaelsThought = await Thought.create({
    thoughtText: `That's what she said!`,
    username: "michael.scott",
  });

  for (let i = 0; i < data.length; i++) {
    const username = data[i].username;
    const email = data[i].email;
    const friends = [];
    const thoughts = [];

    // If username is michael.scott then add the ID of the thought previously created
    if (username === "michael.scott") {
      thoughts.push(michaelsThought._id);
    }

    // Create a single user document
    await User.create({
      username,
      email,
      friends,
      thoughts,
    });

  }

  console.log("Data seeded!");
  process.exit(0);
});
