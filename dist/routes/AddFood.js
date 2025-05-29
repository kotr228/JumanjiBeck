"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
router.post('/menufood', (req, res) => {
    const { idM, Name, Price, Description, Weight, img } = req.body;
    if (!idM || !Name || !Price) {
        return res.status(400).json({ error: 'idM, Name і Price є обов’язковими' });
    }
    const sql = `
    INSERT INTO MenuFood (idM, Name, Price, Description, Weight, img)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
    db_1.default.query(sql, [idM, Name, Price, Description || null, Weight || null, img || null], (err, result) => {
        if (err) {
            console.error('Error adding dish:', err);
            return res.status(500).json({ error: 'Failed to add dish' });
        }
        res.status(201).json({ message: 'Dish added successfully', id: result.insertId });
    });
});
exports.default = router;
