import express from 'express';
import path from 'path';
import dotenv, { config } from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
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


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal' , (req , res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

if(process.env.NODE_ENV === 'production'){
    // Set static folder
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
}else{
    app.get('/' , (req , res) => {
        res.send('API is running');
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});