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
router.post('/addcategory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idName, label } = req.body;
    if (!idName || !label) {
        return res.status(400).json({ message: 'Поля idName і label обов’язкові' });
    }
    try {
        const [result] = yield db_1.default
            .promise()
            .execute('INSERT INTO MenuKategory (idName, label) VALUES (?, ?)', [idName, label]);
        res.status(201).json({ message: 'Категорію додано успішно', id: result.insertId });
    }
    catch (error) {
        console.error('Помилка при додаванні категорії:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
}));
exports.default = router;
