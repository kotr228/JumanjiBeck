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
const express_1 = __importDefault(require("express"));
const db2_1 = __importDefault(require("../config/db2"));
const router = express_1.default.Router();
/**
 * Створити бронювання
 * POST /api/reservations
 * body: { table_id, name, phone, date, time, guests, notes, duration_minutes }
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { table_id, name, phone, date, time, guests, notes = '', duration_minutes = 60 } = req.body;
    if (!table_id || !name || !phone || !date || !time || !guests || !duration_minutes) {
        return res.status(400).json({ message: 'Всі поля обов\'язкові' });
    }
    try {
        const startTime = new Date(`${date}T${time}:00`);
        const endTime = new Date(startTime.getTime() + duration_minutes * 60000);
        // Перевірка, чи час бронювання в діапазоні з 10:00 до 22:00
        const openingHour = 10; // 10 ранку
        const closingHour = 22; // 10 вечора
        if (startTime.getHours() < openingHour ||
            endTime.getHours() >= closingHour ||
            (endTime.getHours() === closingHour && endTime.getMinutes() > 0)) {
            return res.status(400).json({ message: 'Бронювання можна робити лише з 10:00 до 22:00' });
        }
        // Перевірка перетину бронювань по часу
        const [existing] = yield db2_1.default.execute(`
        SELECT * FROM reservations 
        WHERE table_id = ? 
          AND (
            reservation_time < ? AND DATE_ADD(reservation_time, INTERVAL duration_minutes MINUTE) > ?
          )
      `, [table_id, endTime, startTime]);
        if (existing.length > 0) {
            return res.status(409).json({ message: 'Цей стіл вже заброньований на обраний час' });
        }
        const [result] = yield db2_1.default.execute(`INSERT INTO reservations 
        (table_id, customer_name, phone, reservation_time, guests, notes, duration_minutes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`, [table_id, name, phone, startTime, guests, notes, duration_minutes]);
        res.status(201).json({
            message: 'Бронювання створено',
            reservation_id: result.insertId,
        });
    }
    catch (error) {
        console.error('❌ Помилка при створенні бронювання:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
/**
 * Отримати всі бронювання
 */
// GET /api/reservations
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db2_1.default.execute(`
      SELECT 
        r.id,
        r.customer_name AS name,
        r.phone,
        r.guests,
        DATE_FORMAT(r.reservation_time, '%Y-%m-%d') AS date,
        DATE_FORMAT(r.reservation_time, '%H:%i') AS time,
        r.notes,
        r.duration_minutes,
        r.table_id,
        t.table_number
      FROM reservations r
      JOIN tables t ON r.table_id = t.id
      ORDER BY r.reservation_time
    `);
        res.json(rows);
    }
    catch (error) {
        console.error('❌ Помилка при отриманні бронювань:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
/**
 * Видалити бронювання
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield db2_1.default.execute(`DELETE FROM reservations WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Бронювання не знайдено' });
        }
        res.json({ message: 'Бронювання видалено' });
    }
    catch (error) {
        console.error('❌ Помилка при видаленні бронювання:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
exports.default = router;
