import express from 'express';
import pool from '../config/db2'; // твоє підключення до MySQL

const router = express.Router();

/**
 * ➕ Додати новий стіл
 * POST /api/tables
 */
router.post('', async (req, res) => {
  const { table_number, seats, location, is_vip } = req.body;

  if (!table_number || !seats) {
    return res.status(400).json({ message: 'Необхідно вказати номер столу та кількість місць' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO tables (table_number, seats, location, is_vip) VALUES (?, ?, ?, ?)',
      [table_number, seats, location || null, is_vip || false]
    );

    res.status(201).json({
      message: 'Стіл успішно додано',
      table_id: (result as any).insertId,
    });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Стіл з таким номером вже існує' });
    }
    res.status(500).json({ message: 'Помилка сервера', error });
  }
});

/**
 * ✏️ Оновити дані столу
 * PUT /api/tables/:id
 */
router.put('/:id', async (req, res) => {
  const tableId = req.params.id;
  const { table_number, seats, location, is_vip, is_active } = req.body;

  try {
    const [result] = await pool.execute(
      `UPDATE tables 
       SET table_number = ?, seats = ?, location = ?, is_vip = ?, is_active = ?
       WHERE id = ?`,
      [table_number, seats, location || null, is_vip || false, is_active ?? true, tableId]
    );

    res.json({ message: 'Стіл оновлено' });
  } catch (error) {
    console.error('Помилка при оновленні столу:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

/**
 * ❌ Видалити стіл
 * DELETE /api/tables/:id
 */
router.delete('/:id', async (req, res) => {
  const tableId = req.params.id;

  try {
    const [result] = await pool.execute('DELETE FROM tables WHERE id = ?', [tableId]);

    res.json({ message: 'Стіл видалено' });
  } catch (error) {
    console.error('Помилка при видаленні столу:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

/**
 * 📄 Отримати список всіх столів
 * GET /api/tables
 */
router.get('', async (_req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tables ORDER BY table_number');
    res.json(rows);
  } catch (error) {
    console.error('Помилка при отриманні списку столів:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

export default router;
