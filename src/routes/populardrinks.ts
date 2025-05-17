import express from 'express';
import pool from '../config/db';

const router = express.Router();

router.get('/drinks', (req, res) => {
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
      BarMenuFood mfi
    LEFT JOIN 
      favoritesdrinks f ON mfi.id = f.drinks_id
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
