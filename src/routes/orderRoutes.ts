import express from 'express';
import { createOrder, getAllOrders } from '../services/orderService';

const router = express.Router();

// Додати замовлення
router.post('/add', async (req, res) => {
  const { customer_name, products, prices, total, operator, table_number } = req.body;

  if (!customer_name || !products || !prices || !total || !table_number) {
    return res.status(400).json({ error: 'Заповніть всі поля' });
  }

  try {
    const id = await createOrder({ customer_name, products, prices, total, operator, table_number });
    res.status(201).json({ success: true, order_id: id });
  } catch (err) {
    console.error('❌ DB Error:', err);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// Отримати всі замовлення
router.get('/all', async (_req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error('❌ DB Error:', err);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

export default router;
