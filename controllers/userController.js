const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
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
      const userData = await User.findOne({
        _id: req.params.userId,
      })
        .populate("thoughts")
        .populate("friends");

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
      const userData = await User.create(req.body);

      return res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // POST friend to user's friend's list
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

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

      return res
        .status(200)
        .json({
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
};
