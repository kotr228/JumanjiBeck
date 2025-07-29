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
exports.updateUserProfile = void 0;
const db2_1 = __importDefault(require("../config/db2"));
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('📩 Отримано дані з фронту:', req.body);
        const { id, name, email, phone, telegram_nick } = req.body;
        const userId = Number(id); // Приводимо до числа
        if (!userId || !name || !email) {
            return res.status(400).json({ message: 'ID, name та email є обов’язковими' });
        }
        const [result] = yield db2_1.default.execute('UPDATE users SET name = ?, email = ?, phone = ?, telegram_nick = ? WHERE id = ?', [name, email, phone || null, telegram_nick || null, userId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }
        res.json({ message: 'Профіль оновлено успішно' });
    }
    catch (error) {
        console.error('❌ updateUserProfile error:', error);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
});
exports.updateUserProfile = updateUserProfile;
