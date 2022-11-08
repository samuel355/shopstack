const express = require('express')
const User = require('../Models/UserModel.js')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken.js')
const protect = require('../Middleware/AuthMiddleware.js')

const userRouter = express.Router()

//LOGIN
userRouter.post('/login', asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            idAdmin: user.isAdmin,
            token: generateToken(user._id),
            createdAt: user.createdAt
        })
    }else{
        res.status(401)
        throw new Error("Your Email or Password is incorrect")
    }

}))

//REGISTER
userRouter.post('/register', asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            idAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error ("Error occurred! Kindly check all inputs and register again")
    }
}))

//PROFILE
userRouter.get('/profile', protect, asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id : user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt : user.createdAt
        })
        
    } else {
        res.status(404)
        throw new Error("User not found")
    }

}))

//UPDATE PROFILE
userRouter.put('/profile', protect, asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name 
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id : updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            createdAt : updatedUser.createdAt,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }

}))

module.exports = userRouter;