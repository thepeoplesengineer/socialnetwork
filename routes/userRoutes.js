import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from '../controllers/userController.js';

const router = Router();

// /api/users
router.route('/')
  .get(getUsers) // GET all users
  .post(createUser); // POST a new user

// /api/users/:userId
router.route('/:userId')
  .get(getUserById) // GET a single user by ID
  .put(updateUser)  // PUT to update a user by ID
  .delete(deleteUser); // DELETE a user by ID

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend) // POST to add a friend
  .delete(removeFriend); // DELETE to remove a friend

export default router;
