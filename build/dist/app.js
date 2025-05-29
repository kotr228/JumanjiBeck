"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const favorites_1 = __importDefault(require("./routes/favorites"));
const favoritesdrinks_1 = __importDefault(require("./routes/favoritesdrinks"));
const popular_1 = __importDefault(require("./routes/popular"));
const populardrinks_1 = __importDefault(require("./routes/populardrinks"));
const feedback_1 = __importDefault(require("./routes/feedback"));
const AddFood_1 = __importDefault(require("./routes/AddFood"));
const AddDrinks_1 = __importDefault(require("./routes/AddDrinks"));
const uploadImage_1 = __importDefault(require("./routes/uploadImage"));
const addCategoregyFood_1 = __importDefault(require("./routes/addCategoregyFood"));
const GetFeedback_1 = __importDefault(require("./routes/GetFeedback"));
const photosRouter_1 = __importDefault(require("./routes/photosRouter"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json()); // для обробки JSON-запитів
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/users', userRoutes_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/favorites', favorites_1.default);
app.use('/api/favoritesdrinks', favoritesdrinks_1.default);
app.use('/api/popular', popular_1.default);
app.use('/api/popular2', populardrinks_1.default);
app.use('/api/feedback', feedback_1.default);
app.use('/api/add', AddFood_1.default);
app.use('/api/adddrinks', AddDrinks_1.default);
app.use('/api/img', uploadImage_1.default);
app.use('/api/menu', addCategoregyFood_1.default);
app.use('/api/feedback', GetFeedback_1.default);
app.use('/api/photos', photosRouter_1.default);
app.use('/img', express_1.default.static(path_1.default.join(__dirname, '../src/public/img')));
app.use('/galery', express_1.default.static(path_1.default.join(__dirname, '../src/public/galery')));
app.listen(3000, () => {
    console.log('🚀✅Server is running on port 3000');
});
