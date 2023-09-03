import express from 'express';
import dotenv, { config } from 'dotenv';
import products from './data/products.js';
import connectDB from './config/db.js';




dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();   // Connect to MongoDB ... connect afer dotenv.config() to get the value of process.env.MONGO_URI

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((x) => x._id === req.params.id);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});