import { Router } from 'express';
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';

const router = Router();

// Define routes
router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

export default router;
