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
const db2_1 = __importDefault(require("../config/db2")); // твоє підключення до MySQL
const router = express_1.default.Router();
/**
 * ➕ Додати новий стіл
 * POST /api/tables
 */
router.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { table_number, seats, location, is_vip } = req.body;
    if (!table_number || !seats) {
        return res.status(400).json({ message: 'Необхідно вказати номер столу та кількість місць' });
    }
    try {
        const [result] = yield db2_1.default.execute('INSERT INTO tables (table_number, seats, location, is_vip) VALUES (?, ?, ?, ?)', [table_number, seats, location || null, is_vip || false]);
        res.status(201).json({
            message: 'Стіл успішно додано',
            table_id: result.insertId,
        });
    }
    catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Стіл з таким номером вже існує' });
        }
        res.status(500).json({ message: 'Помилка сервера', error });
    }
}));
/**
 * ✏️ Оновити дані столу
 * PUT /api/tables/:id
 */
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tableId = req.params.id;
    const { table_number, seats, location, is_vip, is_active } = req.body;
    try {
        const [result] = yield db2_1.default.execute(`UPDATE tables 
       SET table_number = ?, seats = ?, location = ?, is_vip = ?, is_active = ?
       WHERE id = ?`, [table_number, seats, location || null, is_vip || false, is_active !== null && is_active !== void 0 ? is_active : true, tableId]);
        res.json({ message: 'Стіл оновлено' });
    }
    catch (error) {
        console.error('Помилка при оновленні столу:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
/**
 * ❌ Видалити стіл
 * DELETE /api/tables/:id
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tableId = req.params.id;
    try {
        const [result] = yield db2_1.default.execute('DELETE FROM tables WHERE id = ?', [tableId]);
        res.json({ message: 'Стіл видалено' });
    }
    catch (error) {
        console.error('Помилка при видаленні столу:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
/**
 * 📄 Отримати список всіх столів
 * GET /api/tables
 */
router.get('', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db2_1.default.execute('SELECT * FROM tables ORDER BY table_number');
        res.json(rows);
    }
    catch (error) {
        console.error('Помилка при отриманні списку столів:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
exports.default = router;
