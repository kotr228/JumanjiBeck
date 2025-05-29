"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBarMenuFood = exports.getBarMenuKategory = exports.getMenuFood = exports.getMenuKategory = void 0;
const db_1 = __importDefault(require("../config/db"));
const getMenuKategory = (req, res) => {
    db_1.default.query('SELECT * FROM MenuKategory', (err, results) => {
        if (err) {
            console.error('Database query error: ', err);
            return res.status(500).json({ message: 'Error fetching data from MenuKategory', error: err });
        }
        res.json(results);
    });
};
exports.getMenuKategory = getMenuKategory;
const getMenuFood = (req, res) => {
    db_1.default.query('SELECT * FROM MenuFood', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching data from table2' });
        }
        res.json(results);
    });
};
exports.getMenuFood = getMenuFood;
const getBarMenuKategory = (req, res) => {
    db_1.default.query('SELECT * FROM BarMenuKategory', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching data from table3' });
        }
        res.json(results);
    });
};
exports.getBarMenuKategory = getBarMenuKategory;
const getBarMenuFood = (req, res) => {
    db_1.default.query('SELECT * FROM BarMenuFood', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching data from table4' });
        }
        res.json(results);
    });
};
exports.getBarMenuFood = getBarMenuFood;
