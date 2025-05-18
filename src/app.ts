import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';       
import userRoutes from './routes/userRoutes';  
import favoritesRoutes from './routes/favorites';
import favoritesRoutesdrinks from './routes/favoritesdrinks';
import popularRoutes from './routes/popular';
import popularRoutesdrinks from './routes/populardrinks';
import feedbackRoutes from './routes/feedback';
import addMenuFoodRoutes from './routes/AddFood';
import addMenuDrinksRoutes from './routes/AddDrinks';
import uploadImageRoutes from './routes/uploadImage';
import addCategoregyFood from './routes/addCategoregyFood';
import path from 'path';

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json());  // для обробки JSON-запитів
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/favoritesdrinks', favoritesRoutesdrinks);
app.use('/api/popular', popularRoutes);
app.use('/api/popular2', popularRoutesdrinks);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/add', addMenuFoodRoutes);
app.use('/api/adddrinks', addMenuDrinksRoutes);
app.use('/api/img', uploadImageRoutes);
app.use('/api/menu', addCategoregyFood);


app.use('/img', express.static(path.join(__dirname, '../src/public/img')));

app.listen(3000, () => {
  console.log('🚀✅Server is running on port 3000');
});
