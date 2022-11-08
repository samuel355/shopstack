const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/MongoDb.js');
const router = require('./router.js');
const productRouter = require('./routes/ProductRoutes.js')
const {errorHandler, notFound} = require('./Middleware/Errors.js');
const userRouter = require('./routes/UserRoutes.js');
const orderRouter = require('./routes/OrderRoutes.js');

dotenv.config();
const app = express()

const port = process.env.PORT || 9000

app.use(express.json())
connectDB()

//LOAD PRODUCTS FROM SERVER 
app.use('/api', router) //populate product
app.use('/api', productRouter) //product router 
app.use('/api', orderRouter) //Order router 
app.use('/api', userRouter) //User Router - login - register >>>>

//Error Handlers
app.use(notFound)
app.use(errorHandler)

app.listen(port, console.log(`Server running on port ${port}`));