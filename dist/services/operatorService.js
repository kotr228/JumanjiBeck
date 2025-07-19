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
exports.getAllOperators = exports.deleteOperator = exports.createOperator = void 0;
const db2_1 = __importDefault(require("../config/db2"));
const createOperator = (operator) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db2_1.default.execute(`INSERT INTO operators (name, phone, telegram_nick) VALUES (?, ?, ?)`, [operator.name, operator.phone, operator.telegram_nick]);
    return result.insertId;
});
exports.createOperator = createOperator;
const deleteOperator = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield db2_1.default.execute(`DELETE FROM operators WHERE id = ?`, [id]);
    return result;
});
exports.deleteOperator = deleteOperator;
const getAllOperators = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db2_1.default.query('SELECT * FROM operators');
    return rows;
});
exports.getAllOperators = getAllOperators;
