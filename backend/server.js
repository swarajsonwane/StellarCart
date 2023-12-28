import express from 'express';
import dotenv, { config } from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';




dotenv.config();
const port = process.env.PORT || 5000;
const app = express();


//Body parser
app.use(express.json());    // This will allow us to accept json data in the body
app.use(express.urlencoded({extended: true})); // This will allow us to accept form data in the body

//Cookie parser middleware
app.use(cookieParser());

connectDB();   // Connect to MongoDB ... connect afer dotenv.config() to get the value of process.env.MONGO_URI

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});