import Thought from '../models/Thought.js';
import User from '../models/User.js';

// Get all thoughts
export const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single thought by ID
export const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new thought
export const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    // Push thought to the associated user's thoughts array
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a thought by ID
export const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a thought by ID
export const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json({ message: 'Thought deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a reaction to a thought
export const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true }
    );
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a reaction by ID
export const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
