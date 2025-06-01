"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
router.put('/drink/:id', (req, res) => {
    const { id } = req.params;
    const { Name, Price, Description, Weight, img } = req.body;
    const sql = `
    UPDATE BarMenuFood 
    SET Name = ?, Price = ?, Description = ?, Weight = ?, img = ?
    WHERE id = ?
  `;
    db_1.default.execute(sql, [Name, Price, Description, Weight, img, id], (err, results) => {
        if (err) {
            console.error('Помилка при оновленні напою:', err);
            return res.status(500).json({ error: 'Помилка сервера' });
        }
        res.status(200).json({ message: 'Напій успішно оновлено' });
    });
});
exports.default = router;
