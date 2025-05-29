"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/postRoutes.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
// Додай хоча б один маршрут
router.get('/', (req, res) => {
    res.send('Posts route');
});
exports.default = router;
