// auth.ts (роутер)
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

const router = express.Router();

const JWT_SECRET = 'your_jwt_secret_key'; // краще з .env!

// Регістрація
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [existingUser] = await pool.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if ((existingUser as any[]).length > 0) {
      return res.status(400).json({ message: 'Користувач уже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.promise().query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const [userRows] = await pool.promise().query(
      'SELECT id, name, email FROM users WHERE email = ?',
      [email]
    );

    const user = (userRows as any[])[0];

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Логін
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Знаходимо користувача
    const [rows] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    const users = (rows as any[])[0];

    if (!users) {
      return res.status(400).json({ message: 'Користувача не знайдено' });
    }

    const user = users;

    // Порівняння паролю
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Невірний пароль' });
    }

    // Створення токена
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret_key', { expiresIn: '7d' });

    // Повертаємо користувача без пароля
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.json({ user: userData, token });
  } catch (err) {
    console.error('Помилка при логіні:', err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

export default router;
