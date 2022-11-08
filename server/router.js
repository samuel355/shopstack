const express = require('express')
const User = require('./Models/UserModel.js')
const Product = require('./Models/ProductModel')
const users = require('./data/users.js')
const products = require('./data/products.js')
const asyncHandler = require('express-async-handler')

const router = express.Router()

//POPULATE PRODUCTS TO DB
router.post('/products', asyncHandler(async (req, res) => {
    await Product.remove({}) //to remove all element in the db and insert new 
    const importProduct = await Product.insertMany(products)
    res.send({importProduct})
}))

//POPULATE USERS DATA
router.post('/users', asyncHandler(async (req, res) => {
    await User.remove({}) //to remove all element in the db and insert new 
    const importUser = await User.insertMany(users)
    res.send({importUser})
}))

//TESTING THE ENDPOINT
router.get('/test', asyncHandler(async(req, res) => {
    res.send('Application is working successfully.')
}))

module.exports = router