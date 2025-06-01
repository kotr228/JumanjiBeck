import express from 'express';
import pool from '../config/db'; 

const router = express.Router();

// DELETE /api/delete/dish/:id
router.delete('/dish/:id', async (req, res) => {
  const dishId = req.params.id;

  try {
    const [result]: any = await pool.promise().query('DELETE FROM MenuFood WHERE id = ?', [dishId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Страву не знайдено' });
    }

    res.json({ message: 'Страву успішно видалено' });
  } catch (error) {
    console.error('❌ Помилка при видаленні страви:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
});

export default router;
