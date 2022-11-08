const express = require('express')
const Product = require('../Models/ProductModel.js')
const asyncHandler = require('express-async-handler')

const productRouter = express.Router()

//LOAD PRODUCTS FROM MONGOOSE DB
productRouter.get('/products', asyncHandler(async(req, res) => {
    const fetchProducts = await Product.find()
    res.json(fetchProducts)
}))

//LOAD SINGLE PRODUCT 
productRouter.get('/products/:id', asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error("Product not Found")
    }
}))

module.exports = productRouter;