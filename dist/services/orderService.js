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
exports.getAllOrders = exports.createOrder = void 0;
const db2_1 = __importDefault(require("../config/db2"));
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_name, products, prices, total, operator, table_number } = order;
    // Серіалізуємо масиви у рядки JSON
    const productsJson = JSON.stringify(products);
    const pricesJson = JSON.stringify(prices);
    const [result] = yield db2_1.default.execute(`INSERT INTO orders (customer_name, products, prices, total, operator, table_number) VALUES (?, ?, ?, ?, ?, ?)`, [customer_name, productsJson, pricesJson, total, operator, table_number]);
    // @ts-ignore - залежить від типу результату
    return result.insertId;
});
exports.createOrder = createOrder;
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db2_1.default.query(`SELECT * FROM orders ORDER BY created_at DESC`);
    return rows;
});
exports.getAllOrders = getAllOrders;
