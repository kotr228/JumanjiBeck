"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = require("../controllers/profileController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// PATCH /api/profile/update
router.patch('/update', profileController_1.updateUserProfile);
router.get('/profile/:id', userController_1.getUserProfile);
exports.default = router;
