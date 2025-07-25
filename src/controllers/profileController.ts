import { Request, Response } from 'express';
import pool from '../config/db2';

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    console.log('📩 Отримано дані з фронту:', req.body);

    const { id, name, email, phone, telegram_nick } = req.body;

    const userId = Number(id); // Приводимо до числа

    if (!userId || !name || !email) {
      return res.status(400).json({ message: 'ID, name та email є обов’язковими' });
    }

    const [result]: any = await pool.execute(
      'UPDATE users SET name = ?, email = ?, phone = ?, telegram_nick = ? WHERE id = ?',
      [name, email, phone || null, telegram_nick || null, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    res.json({ message: 'Профіль оновлено успішно' });
  } catch (error) {
    console.error('❌ updateUserProfile error:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
};
