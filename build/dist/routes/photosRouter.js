"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const db_1 = __importDefault(require("../config/db"));
const router = (0, express_1.Router)();
// Шлях до папки для зберігання фото
const uploadDir = path_1.default.join(__dirname, '..', 'public', 'galery');
// Створити директорію, якщо вона не існує
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
// Налаштування сховища Multer
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({ storage });
// === POST /seter ===
router.post('/seter', upload.single('photo'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ error: 'Файл обов’язковий' });
    }
    const filename = req.file.filename;
    const filepath = `/galery/${filename}`; // шлях для доступу через браузер
    try {
        const [result] = yield db_1.default.promise().query('INSERT INTO photos (filename, filepath) VALUES (?, ?)', [filename, filepath]);
        res.status(201).json({ message: 'Фото збережено', insertId: result.insertId });
    }
    catch (err) {
        console.error('DB insert error:', err);
        res.status(500).json({ error: 'Помилка сервера' });
    }
}));
// === GET /geter ===
router.get('/geter', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.promise().query('SELECT * FROM photos ORDER BY uploaded_at DESC');
        res.json(rows);
    }
    catch (err) {
        console.error('DB fetch error:', err);
        res.status(500).json({ error: 'Помилка сервера' });
    }
}));
exports.default = router;
