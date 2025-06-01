"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// Створюємо папку img, якщо не існує
const imgPath = path_1.default.join(__dirname, '../', '../', 'public', 'img');
if (!fs_1.default.existsSync(imgPath)) {
    fs_1.default.mkdirSync(imgPath, { recursive: true });
}
// Налаштування сховища
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imgPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// POST /api/upload
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Файл не завантажено' });
    }
    // Повертаємо шлях до файлу (відносно public)
    res.json({
        filename: req.file.filename,
        path: `https://server.jumanjialex.com.ua/${req.file.filename}`,
    });
});
exports.default = router;
