// routes/favorites.ts
import express from 'express';
import pool from '../config/db';

const router = express.Router();

// ➕ Додати до улюблених
router.post('/add', async (req, res) => {
  const { userId, dishId } = req.body;

  try {
    await pool.promise().query(
      'INSERT INTO favoritesdrinks (user_id, drinks_id) VALUES (?, ?)',
      [userId, dishId]
    );
    res.status(201).json({ message: 'Страва додана до улюблених' });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Вже в улюблених' });
    }
    console.error('Помилка при додаванні в улюблені:', err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// ➖ Видалити з улюблених
router.post('/remove', async (req, res) => {
  const { userId, dishId } = req.body;

  try {
    await pool.promise().query(
      'DELETE FROM favoritesdrinks WHERE user_id = ? AND drinks_id = ?',
      [userId, dishId]
    );
    res.json({ message: 'Страву видалено з улюблених' });
  } catch (err) {
    console.error('Помилка при видаленні з улюблених:', err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// 📋 Отримати всі улюблені страви користувача
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.promise().query(
      `SELECT d.* 
       FROM favoritesdrinks f
       JOIN BarMenuFood  d ON f.drinks_id = d.id
       WHERE f.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Помилка при отриманні улюблених:', err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

export default router;
