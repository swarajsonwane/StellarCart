import express from 'express';
import {getProducts, getProductById, getTopProducts} from '../controllers/productController.js';


const router = express.Router();


router.get('/top', getTopProducts);
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;