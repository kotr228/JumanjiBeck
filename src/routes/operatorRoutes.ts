// routes/operatorRoutes.ts
import express from 'express';
import { createOperator, deleteOperator, getAllOperators } from '../services/operatorService';

const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, phone, telegram_nick } = req.body;

  if (!name || !phone || !telegram_nick) {
    return res.status(400).json({ error: 'Заповніть всі поля' });
  }

  try {
    const result = await createOperator({ name, phone, telegram_nick });
    res.status(201).json({ success: true, result });
  } catch (err) {
    console.error('❌ DB Error:', err);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: 'Невірний ID' });
  }

  try {
    const result = await deleteOperator(id);
    // @ts-ignore
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Оператор не знайдений' });
    }
    res.json({ success: true, message: `Оператор з id=${id} видалений` });
  } catch (err) {
    console.error('❌ DB Error:', err);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const operators = await getAllOperators();
    res.json(operators);
  } catch (err) {
    console.error('❌ DB Error:', err);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

export default router;
