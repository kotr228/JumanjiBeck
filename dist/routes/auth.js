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
// auth.ts (роутер)
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
const JWT_SECRET = 'your_jwt_secret_key'; // краще з .env!
// Регістрація
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const [existingUser] = yield db_1.default.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Користувач уже існує' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield db_1.default.promise().query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        const [userRows] = yield db_1.default.promise().query('SELECT id, name, email FROM users WHERE email = ?', [email]);
        const user = userRows[0];
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ user, token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
// Логін
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Знаходимо користувача
        const [rows] = yield db_1.default.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        const users = rows[0];
        if (!users) {
            return res.status(400).json({ message: 'Користувача не знайдено' });
        }
        const user = users;
        // Порівняння паролю
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Невірний пароль' });
        }
        // Створення токена
        const token = jsonwebtoken_1.default.sign({ id: user.id }, 'your_jwt_secret_key', { expiresIn: '7d' });
        // Повертаємо користувача без пароля
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        res.json({ user: userData, token });
    }
    catch (err) {
        console.error('Помилка при логіні:', err);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
exports.default = router;
