import express from 'express';
import pool from '../config/db';

const router = express.Router();

router.post('/feedback', (req, res) => {
  const query = `
    SELECT 
      f.id,
      f.user_id,
      u.name AS username,
      f.dish_rating,
      f.service_rating,
      f.comment,
      f.contact_allowed,
      f.created_at
    FROM feedback f
    JOIN users u ON f.user_id = u.id
    ORDER BY f.created_at DESC
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Database query error: ', err);
      return res.status(500).json({ message: 'Error fetching data from Feedback', error: err });
    }
    res.json(results);
  });
});

export default router;
