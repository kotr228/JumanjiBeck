// src/routes/reservations.ts
import { Router } from 'express';
import { getAllReservations } from '../controllers/reservationsController';

const router = Router();

router.get('/', getAllReservations);

export default router;
