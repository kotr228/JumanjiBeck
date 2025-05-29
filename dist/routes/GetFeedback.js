"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
router.post('/feedback', (req, res) => {
    const query = `
    SELECT 
      f.id,
      f.user_id,
      u.name AS username,
      f.dish_rating,
      f.service_rating,
      f.comment,
      f.contact_allowed,
      f.created_at
    FROM feedback f
    JOIN users u ON f.user_id = u.id
    ORDER BY f.created_at DESC
  `;
    db_1.default.query(query, (err, results) => {
        if (err) {
            console.error('Database query error: ', err);
            return res.status(500).json({ message: 'Error fetching data from Feedback', error: err });
        }
        res.json(results);
    });
});
exports.default = router;
