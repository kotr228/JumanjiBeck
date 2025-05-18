import express from 'express';
import pool from '../config/db';

const router = express.Router();

router.post('/menufood', (req, res) => {
  const { idM, Name, Price, Description, Weight, img } = req.body;

  if (!idM || !Name || !Price) {
    return res.status(400).json({ error: 'idM, Name і Price є обов’язковими' });
  }

  const sql = `
    INSERT INTO MenuFood (idM, Name, Price, Description, Weight, img)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  pool.query(sql, [idM, Name, Price, Description || null, Weight || null, img || null], (err, result) => {
    if (err) {
      console.error('Error adding dish:', err);
      return res.status(500).json({ error: 'Failed to add dish' });
    }

    res.status(201).json({ message: 'Dish added successfully', id: (result as any).insertId });
  });
});

export default router;
