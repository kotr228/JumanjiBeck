import express from 'express';
import pool from '../config/db2';

const router = express.Router();

/**
 * Створити бронювання
 * POST /api/reservations
 * body: { table_id, name, phone, date, time, guests, notes, duration_minutes }
 */
router.post('/', async (req, res) => {
  const { table_id, name, phone, date, time, guests, notes = '', duration_minutes = 60 } = req.body;

  if (!table_id || !name || !phone || !date || !time || !guests || !duration_minutes) {
    return res.status(400).json({ message: 'Всі поля обов\'язкові' });
  }

  try {
    const startTime = new Date(`${date}T${time}:00`);
    const endTime = new Date(startTime.getTime() + duration_minutes * 60000);

    // Перевірка, чи час бронювання в діапазоні з 10:00 до 22:00
    const openingHour = 10; // 10 ранку
    const closingHour = 22; // 10 вечора

    if (
      startTime.getHours() < openingHour ||
      endTime.getHours() >= closingHour ||
      (endTime.getHours() === closingHour && endTime.getMinutes() > 0)
    ) {
      return res.status(400).json({ message: 'Бронювання можна робити лише з 10:00 до 22:00' });
    }

    // Перевірка перетину бронювань по часу
    const [existing] = await pool.execute(
      `
        SELECT * FROM reservations 
        WHERE table_id = ? 
          AND (
            reservation_time < ? AND DATE_ADD(reservation_time, INTERVAL duration_minutes MINUTE) > ?
          )
      `,
      [table_id, endTime, startTime]
    );

    if ((existing as any[]).length > 0) {
      return res.status(409).json({ message: 'Цей стіл вже заброньований на обраний час' });
    }

    const [result] = await pool.execute(
      `INSERT INTO reservations 
        (table_id, customer_name, phone, reservation_time, guests, notes, duration_minutes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [table_id, name, phone, startTime, guests, notes, duration_minutes]
    );

    res.status(201).json({
      message: 'Бронювання створено',
      reservation_id: (result as any).insertId,
    });
  } catch (error) {
    console.error('❌ Помилка при створенні бронювання:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});


/**
 * Отримати всі бронювання
 */
// GET /api/reservations
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        r.id,
        r.customer_name AS name,
        r.phone,
        r.guests,
        DATE_FORMAT(r.reservation_time, '%Y-%m-%d') AS date,
        DATE_FORMAT(r.reservation_time, '%H:%i') AS time,
        r.notes,
        r.duration_minutes,
        r.table_id,
        t.table_number
      FROM reservations r
      JOIN tables t ON r.table_id = t.id
      ORDER BY r.reservation_time
    `);

    res.json(rows);
  } catch (error) {
    console.error('❌ Помилка при отриманні бронювань:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});


/**
 * Видалити бронювання
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute(`DELETE FROM reservations WHERE id = ?`, [id]);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'Бронювання не знайдено' });
    }

    res.json({ message: 'Бронювання видалено' });
  } catch (error) {
    console.error('❌ Помилка при видаленні бронювання:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

export default router;
