// src/controllers/reservationsController.ts
import { Request, Response } from 'express';
import pool from '../config/db2';

export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reservations ORDER BY reservation_time DESC');
    res.json(rows);
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ message: 'Помилка отримання бронювань' });
  }
};
