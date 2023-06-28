const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // GET all thoughts
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();

      return res.status(200).json(thoughtData);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // GET a single thought
  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      return res.status(200).json(thoughtData);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
