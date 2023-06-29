// Import models
const { User, Thought } = require("../models");

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      // Retrieve all user documents
      const userData = await User.find();

      return res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // GET a single user
  async getSingleUser(req, res) {
    try {
      // Retrieve a user document based on the ID value provided
      const userData = await User.findOne({
        _id: req.params.userId,
      })
        .populate("thoughts") // Populate the thoughts array/subdoc
        .populate("friends"); // Populate the friends array/subdoc

      if (!userData) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      return res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // POST user
  async createUser(req, res) {
    try {
      // Create a user document using the POST request body
      const userData = await User.create(req.body);

      return res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // POST friend to user's friends list
  async addFriend(req, res) {
    try {
      // Find a user using the userId value provided in the request
      // Then, add the other user's ID (friendId) to their friends array
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      // Now do the opposite, find the friend using their ID and add the user's ID to the friend's friends array
      const friendData = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      if (!friendData) {
        return res.status(404).json({ message: "No user with that friend ID" });
      }

      return res.status(200).json({
        message: `${userData.username} and ${friendData.username} are now friends!`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // PUT single user
  async updateUser(req, res) {
    try {
      // Find a user using the userId value provided in the request
      // Then, update their email property using the value provided in the POST request body
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { email: req.body.email },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      return res.status(200).json({
        message: "User has been updated",
        user: userData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // DELETE single user
  async deleteUser(req, res) {
    try {
      // Find a user using the userId value provided in the request and delete them
      const userData = await User.findOneAndDelete({ _id: req.params.userId });

      if (!userData) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      // Delete multiple thought documents whose username property equals the username property
      //  of the recently deleted user
      const thoughtData = await Thought.deleteMany({
        username: userData.username,
      });

      return res.status(200).json({
        message: `${userData.username} and their thoughts have been deleted`,
        user: userData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // DELETE friend from user's friends list
  async unfriend(req, res) {
    try {
      // Find a user using the userId value provided in the request
      // Then, remove the other user's ID (friendId) from their friends array
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      // Now do the opposite, find the friend using their ID and remove the user's ID from the friend's friends array
      const friendData = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      if (!friendData) {
        return res.status(404).json({ message: "No user with that friend ID" });
      }

      return res.status(200).json({
        message: `${userData.username} and ${friendData.username} are no longer friends!`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
