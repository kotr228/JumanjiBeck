import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

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
import GetFeedback from './routes/GetFeedback';
import PhtoRoutes from './routes/photosRouter';
import UpdateMenu from './routes/updatemenu';
import DeleteMenu from './routes/deletemenu';
import UpdateDrink from './routes/updateDrink';
import DeleteDrink from './routes/deleteDrink';
import operatorRoutes from './routes/operatorRoutes';
import orderRoutes from './routes/orderRoutes';
import tablesRouter from './routes/tablesRouter';
import reservationRouter from './routes/reservationsRouter';
import profileRoutes from './routes/profileRoutes';

const app = express();

// ✅ Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ API Routes
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
app.use('/api/feedback', GetFeedback);
app.use('/api/photos', PhtoRoutes);
app.use('/api/update', UpdateMenu);
app.use('/api/delete', DeleteMenu);
app.use('/api/updateDrink', UpdateDrink);
app.use('/api/deleteDrink', DeleteDrink);
app.use('/api/operator', operatorRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/tables', tablesRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/profile', profileRoutes);

app.use('/img', express.static(path.join(__dirname, '../public/img')));
app.use('/galery', express.static(path.join(__dirname, '../public/galery')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀✅ Server is running on port ${PORT}`);
});
