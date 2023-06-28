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
};
