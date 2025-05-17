import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';       
import userRoutes from './routes/userRoutes';  
import favoritesRoutes from './routes/favorites';

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', // адаптуй якщо у тебе інша адреса
  credentials: true
}));

app.use(express.json());  // для обробки JSON-запитів
app.use(bodyParser.urlencoded({ extended: true })); // (опціонально, якщо приймаєш form-data)

app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes); 

app.listen(3000, () => {
  console.log('🚀✅Server is running on port 3000');
});
