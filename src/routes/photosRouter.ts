import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import pool from '../config/db';

const router = Router();

// Шлях до папки для зберігання фото
const uploadDir = path.join(__dirname, '../', '../', '../' , 'public', 'galery');

// Створити директорію, якщо вона не існує
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Налаштування сховища Multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// === POST /seter ===
router.post('/seter', upload.single('photo'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Файл обов’язковий' });
  }

  const filename = req.file.filename;
  const filepath = `/galery/${filename}`; // шлях для доступу через браузер

  try {
    const [result] = await pool.promise().query(
      'INSERT INTO photos (filename, filepath) VALUES (?, ?)',
      [filename, filepath]
    );

    res.status(201).json({ message: 'Фото збережено', insertId: (result as any).insertId });
  } catch (err) {
    console.error('DB insert error:', err);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// === GET /geter ===
router.get('/geter', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.promise().query(
      'SELECT * FROM photos ORDER BY uploaded_at DESC'
    );

    res.json(rows);
  } catch (err) {
    console.error('DB fetch error:', err);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

export default router;
