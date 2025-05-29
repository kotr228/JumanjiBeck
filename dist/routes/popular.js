"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
router.get('/dishes', (req, res) => {
    const query = `
    SELECT 
      mfi.id,
      mfi.idM,
      mfi.Name,
      mfi.Price,
      mfi.Description,
      mfi.Weight,
      mfi.img,
      COUNT(f.id) AS favorite_count
    FROM 
      MenuFood mfi
    LEFT JOIN 
      favorites f ON mfi.id = f.dish_id
    GROUP BY 
      mfi.id
    ORDER BY 
      favorite_count DESC;
  `;
    db_1.default.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching popular dishes:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});
exports.default = router;
