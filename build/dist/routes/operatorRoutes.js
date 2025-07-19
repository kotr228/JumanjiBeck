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
// routes/operatorRoutes.ts
const express_1 = __importDefault(require("express"));
const operatorService_1 = require("../services/operatorService");
const router = express_1.default.Router();
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, telegram_nick } = req.body;
    if (!name || !phone || !telegram_nick) {
        return res.status(400).json({ error: 'Заповніть всі поля' });
    }
    try {
        const result = yield (0, operatorService_1.createOperator)({ name, phone, telegram_nick });
        res.status(201).json({ success: true, result });
    }
    catch (err) {
        console.error('❌ DB Error:', err);
        res.status(500).json({ error: 'Помилка сервера' });
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'Невірний ID' });
    }
    try {
        const result = yield (0, operatorService_1.deleteOperator)(id);
        // @ts-ignore
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Оператор не знайдений' });
        }
        res.json({ success: true, message: `Оператор з id=${id} видалений` });
    }
    catch (err) {
        console.error('❌ DB Error:', err);
        res.status(500).json({ error: 'Помилка сервера' });
    }
}));
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operators = yield (0, operatorService_1.getAllOperators)();
        res.json(operators);
    }
    catch (err) {
        console.error('❌ DB Error:', err);
        res.status(500).json({ error: 'Помилка сервера' });
    }
}));
exports.default = router;
