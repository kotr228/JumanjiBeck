import { Request, Response } from 'express';
import pool from '../config/db2';
import { RowDataPacket } from 'mysql2';

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  telegram_nick: string;
};

export const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const [rows] = await pool.query<(UserProfile & RowDataPacket)[]>(
      'SELECT name, email, phone, telegram_nick FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};
