import express from 'express';
import dotenv, { config } from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';




dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();   // Connect to MongoDB ... connect afer dotenv.config() to get the value of process.env.MONGO_URI

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});