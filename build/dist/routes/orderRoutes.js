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
const orderService_1 = require("../services/orderService");
const router = express_1.default.Router();
// Додати замовлення
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_name, products, prices, total, operator, table_number } = req.body;
    if (!customer_name || !products || !prices || !total || !table_number) {
        return res.status(400).json({ error: 'Заповніть всі поля' });
    }
    try {
        const id = yield (0, orderService_1.createOrder)({ customer_name, products, prices, total, operator, table_number });
        res.status(201).json({ success: true, order_id: id });
    }
    catch (err) {
        console.error('❌ DB Error:', err);
        res.status(500).json({ error: 'Помилка сервера' });
    }
}));
// Отримати всі замовлення
router.get('/all', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, orderService_1.getAllOrders)();
        res.status(200).json(orders);
    }
    catch (err) {
        console.error('❌ DB Error:', err);
        res.status(500).json({ error: 'Помилка сервера' });
    }
}));
exports.default = router;
