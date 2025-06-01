import express from 'express';
import pool from '../config/db'; 

const router = express.Router();

router.delete('/drink/:id', async (req, res) => {
  const dishId = req.params.id;

  try {
    const [result]: any = await pool.promise().query('DELETE FROM BarMenuFood WHERE id = ?', [dishId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Напій не знайдено' });
    }

    res.json({ message: 'Напій успішно видалено' });
  } catch (error) {
    console.error('❌ Помилка при видаленні напою:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
});

export default router;
