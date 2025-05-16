import { Router } from 'express';
import { getMenuKategory, getMenuFood, getBarMenuKategory, getBarMenuFood } from '../controllers/dbSetContoller';

const router = Router();

router.get('/getMenuKategory', getMenuKategory);
router.get('/getMenuFood', getMenuFood);
router.get('/getBarMenuKategory', getBarMenuKategory);
router.get('/getBarMenuFood', getBarMenuFood);

export default router;
