const express = require('express')
const Order = require('../Models/OrderModel')
const asyncHandler = require('express-async-handler')
const protect = require('../Middleware/AuthMiddleware.js')

const orderRouter = express.Router()

//CREATE NEW ORDER
orderRouter.post(
    '/create-order', 
    protect,
    asyncHandler(async(req, res) => {
        const {
            paymentResult,
            orderItems, 
            shippingAddress, 
            shippingPrice,
            productsTotalPrice,
            totalPrice,
        } = req.body;

        if(orderItems && orderItems.length === 0){
            res.status(404)
            throw new Error ("No Order Items")
            return
        }else{
            const order = new Order ({
                paymentResult,
                orderItems, 
                user: req.user._id,
                shippingAddress, 
                shippingPrice,
                productsTotalPrice,
                totalPrice,
                
            })
    
            const createOrder = await order.save()
            res.status(201).json(createOrder)
        }
    })   
);

//LOAD ORDERS FROM MONGOOSE DB
// orderRouter.get('/orders', asyncHandler(async(req, res) => {
//     const fetchOrders = await Order.find()
//     if(fetchOrders){
//         res.json(fetchOrders)
//     }else{
//         res.status(404)
//         throw new Error("Orders not Found")
//     }
// }))

//LOAD SINGLE ORDER BY ID
orderRouter.get('/orders/:id', protect, asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )
    if(order){
        res.json(order) 
    }else{
        res.status(404)
        throw new Error("Order not Found")
    }
}))

//USER LOGIN ORDERS
orderRouter.get('/orders', protect, asyncHandler(async(req, res) => {
    const order = await Order.find({user: req.user._id}).sort({_id: -1})
    
    res.json(order)
}))


module.exports = orderRouter;