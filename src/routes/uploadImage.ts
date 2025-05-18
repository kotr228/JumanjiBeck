import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Створюємо папку img, якщо не існує
const imgPath = path.join(__dirname, '..', 'public', 'img');
if (!fs.existsSync(imgPath)) {
  fs.mkdirSync(imgPath, { recursive: true });
}

// Налаштування сховища
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage });

// POST /api/upload
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Файл не завантажено' });
  }

  // Повертаємо шлях до файлу (відносно public)
  res.json({
    filename: req.file.filename,
    path: `img/${req.file.filename}`,
  });
});

export default router;
