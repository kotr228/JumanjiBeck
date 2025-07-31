import express from 'express';
import { searchMenu } from '../controllers/menuController';

const router = express.Router();

router.get('/search', searchMenu);

export default router;
