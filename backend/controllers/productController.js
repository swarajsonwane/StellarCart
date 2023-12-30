import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
        name : {
            $regex : req.query.keyword,
            $options : 'i'  // case insensitive
        }
    } : {};

    const count = await Product.countDocuments({...keyword});  // This will give us the total number of products
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
    res.send({products , page , pages: Math.ceil(count / pageSize)});
    }
);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get top rated product
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler( async (req, res) => {
    const products = await Product.find().sort({rating : -1}).limit(3);
   res.status(200).json(products);
});

export {getProducts, getProductById, getTopProducts};