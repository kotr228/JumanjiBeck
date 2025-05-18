import express from 'express';
import pool from '../config/db';
import { ResultSetHeader } from 'mysql2';

const router = express.Router();

router.post('/addcategory', async (req, res) => {
  const { idName, label } = req.body;

  if (!idName || !label) {
    return res.status(400).json({ message: 'Поля idName і label обов’язкові' });
  }

  try {
    const [result] = await pool
      .promise()
      .execute<ResultSetHeader>(
        'INSERT INTO MenuKategory (idName, label) VALUES (?, ?)',
        [idName, label]
      );

    res.status(201).json({ message: 'Категорію додано успішно', id: result.insertId });
  } catch (error) {
    console.error('Помилка при додаванні категорії:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

export default router;
