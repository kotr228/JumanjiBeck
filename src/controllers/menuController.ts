import { Request, Response } from 'express';
import db from '../config/db2';

export const searchMenu = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Параметр query обовʼязковий' });
    }

    const foodQuery = `
      SELECT id, idM, Name, Price, Description, Weight, img
      FROM MenuFood
      WHERE Name LIKE CONCAT('%', ?, '%')
    `;

    const drinkQuery = `
      SELECT id, idM, Name, Price, Description, Weight, img
      FROM BarMenuFood
      WHERE Name LIKE CONCAT('%', ?, '%')
    `;

    const [foods] = await db.execute(foodQuery, [query]);
    const [drinks] = await db.execute(drinkQuery, [query]);

    res.json({
      foods,
      drinks
    });
  } catch (error) {
    console.error('Помилка при пошуку:', error);
    res.status(500).json({ error: 'Внутрішня помилка сервера' });
  }
};
