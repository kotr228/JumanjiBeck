"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
// Додати новий відгук
router.post('/add', (req, res) => {
    const { user_id, dish_rating, service_rating, comment, contact_allowed } = req.body;
    const contactAllowedNum = contact_allowed ? 1 : 0;
    console.log('Inserting feedback:', { user_id, dish_rating, service_rating, comment, contactAllowedNum });
    const sql = `
    INSERT INTO feedback (user_id, dish_rating, service_rating, comment, contact_allowed)
    VALUES (?, ?, ?, ?, ?)
  `;
    db_1.default.query(sql, [user_id, dish_rating, service_rating, comment, contactAllowedNum], (error, results) => {
        if (error) {
            console.error('Error inserting feedback:', error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
        res.status(201).json({ id: results.insertId });
    });
});
// Отримати всі відгуки
router.get('/get', (_req, res) => {
    const sql = `SELECT * FROM feedback ORDER BY created_at DESC`;
    db_1.default.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching feedback:', error);
            return res.status(500).json({ error: 'Failed to fetch feedback' });
        }
        res.json(results);
    });
});
exports.default = router;
