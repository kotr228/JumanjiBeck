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
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
// DELETE /api/delete/dish/:id
router.delete('/dish/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dishId = req.params.id;
    try {
        const [result] = yield db_1.default.promise().query('DELETE FROM MenuFood WHERE id = ?', [dishId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Страву не знайдено' });
        }
        res.json({ message: 'Страву успішно видалено' });
    }
    catch (error) {
        console.error('❌ Помилка при видаленні страви:', error);
        res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
}));
exports.default = router;
