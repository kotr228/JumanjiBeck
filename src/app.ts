import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';        // ✅ маршрут авторизації/реєстрації
import userRoutes from './routes/userRoutes';  // інші запити (якщо в тебе меню/кошик тощо)

const app = express();

// 👇 Дозволити запити з фронтенду
app.use(cors({
  origin: 'http://localhost:5173', // адаптуй якщо у тебе інша адреса
  credentials: true
}));

app.use(express.json());  // для обробки JSON-запитів
app.use(bodyParser.urlencoded({ extended: true })); // (опціонально, якщо приймаєш form-data)

// ✅ Додаємо маршрути
app.use('/api/users', userRoutes); // напр. /api/users/profile
app.use('/api/auth', authRoutes);  // 🔑 /api/auth/register та інші

// 🚀 Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
