// src/routes/postRoutes.ts
import { Router } from 'express';

const router = Router();

// Додай хоча б один маршрут
router.get('/', (req, res) => {
  res.send('Posts route');
});

export default router;
