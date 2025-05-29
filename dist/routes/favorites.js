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
// routes/favorites.ts
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
// ➕ Додати до улюблених
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, dishId } = req.body;
    try {
        yield db_1.default.promise().query('INSERT INTO favorites (user_id, dish_id) VALUES (?, ?)', [userId, dishId]);
        res.status(201).json({ message: 'Страва додана до улюблених' });
    }
    catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Вже в улюблених' });
        }
        console.error('Помилка при додаванні в улюблені:', err);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
// ➖ Видалити з улюблених
router.post('/remove', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, dishId } = req.body;
    try {
        yield db_1.default.promise().query('DELETE FROM favorites WHERE user_id = ? AND dish_id = ?', [userId, dishId]);
        res.json({ message: 'Страву видалено з улюблених' });
    }
    catch (err) {
        console.error('Помилка при видаленні з улюблених:', err);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
// 📋 Отримати всі улюблені страви користувача
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const [rows] = yield db_1.default.promise().query(`SELECT d.* 
       FROM favorites f
       JOIN MenuFood  d ON f.dish_id = d.id
       WHERE f.user_id = ?`, [userId]);
        res.json(rows);
    }
    catch (err) {
        console.error('Помилка при отриманні улюблених:', err);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
exports.default = router;
