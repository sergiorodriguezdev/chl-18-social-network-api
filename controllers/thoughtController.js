// Import models
const { User, Thought } = require("../models");

module.exports = {
  // GET all thoughts
  async getThoughts(req, res) {
    try {
      // Retrieve all thought documents
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
      // Retrieve a thought document based on ID value provided
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

  // POST thought
  async createThought(req, res) {
    try {
      // Create a thought document using the POST request body
      const thoughtData = await Thought.create(req.body);

      // Find a user using the userId value provided in the POST request body
      // Then, add the ID of the newly created thought to the user's thoughts array
      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughtData._id } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({
          message: "Thought created, but there is no user with that ID",
        });
      }

      return res
        .status(200)
        .json({ message: `Thought created for ${thoughtData.username}` });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // POST reaction to a thought
  async addReaction(req, res) {
    try {
      // Find a thought using the thoughtId value provided in the request
      // Then, add a new reaction using the POST request body to the thought's reactions array
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      return res.status(200).json({ message: "Reaction created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // PUT single thought
  async updateThought(req, res) {
    try {
      // Find a thought using the thoughtId value provided in the request
      // Then, update its thoughtText property using the value provided in the POST request body
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { thoughtText: req.body.thoughtText },
        { new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      return res.status(200).json({
        message: "Thought has been updated",
        thought: thoughtData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // DELETE single thought
  async deleteThought(req, res) {
    try {
      // Find a thought using the thoughtId value provided in the request and delete it
      const thoughtData = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      // Find a user using the deleted thought's username property
      //  Then, remove an existing thoughtId from the user's thoughts array
      const userData = await User.findOneAndUpdate(
        { username: thoughtData.username },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      return res.status(200).json({
        message: "Thought has been deleted",
        thought: thoughtData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  // DELETE reaction from a thought
  async deleteReaction(req, res) {
    try {
      // Find a thought using the thoughtId value provided in the request
      // Then, remove the reaction using the reactionId value provided in the request from the thought's reactions array
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      return res.status(200).json({
        message: "Reaction has been deleted from thought",
        thought: thoughtData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
