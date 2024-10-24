import { Router } from 'express';
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../controllers/thoughtController.js';

const router = Router();

// /api/thoughts
router.route('/')
  .get(getThoughts) // GET all thoughts
  .post(createThought); // POST a new thought

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getThoughtById) // GET a single thought by ID
  .put(updateThought)  // PUT to update a thought by ID
  .delete(deleteThought); // DELETE a thought by ID

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction); // POST a new reaction

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction); // DELETE a reaction by reaction ID

export default router;
