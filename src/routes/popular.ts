import express from 'express';
import pool from '../config/db';

const router = express.Router();

router.get('/dishes', (req, res) => {
  const query = `
    SELECT 
      mfi.id,
      mfi.idM,
      mfi.Name,
      mfi.Price,
      mfi.Description,
      mfi.Weight,
      mfi.img,
      COUNT(f.id) AS favorite_count
    FROM 
      MenuFood mfi
    LEFT JOIN 
      favorites f ON mfi.id = f.dish_id
    GROUP BY 
      mfi.id
    ORDER BY 
      favorite_count DESC;
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching popular dishes:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
});

export default router;
