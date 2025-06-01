import express from 'express';
import pool from '../config/db'; 

const router = express.Router();

router.put('/dishes/:id', (req, res) => {
  const { id } = req.params;
  const { Name, Price, Description, Weight, img } = req.body;

  const sql = `
    UPDATE MenuFood 
    SET Name = ?, Price = ?, Description = ?, Weight = ?, img = ?
    WHERE id = ?
  `;

  pool.execute(sql, [Name, Price, Description, Weight, img, id], (err, results) => {
    if (err) {
      console.error('Помилка при оновленні страви:', err);
      return res.status(500).json({ error: 'Помилка сервера' });
    }
    res.status(200).json({ message: 'Страву успішно оновлено' });
  });
});

export default router;
