import express from 'express';
import { updateUserProfile } from '../controllers/profileController';
import { getUserProfile } from '../controllers/userController';

const router = express.Router();

// PATCH /api/profile/update
router.patch('/update', updateUserProfile);
router.get('/profile/:id', getUserProfile);

export default router;
