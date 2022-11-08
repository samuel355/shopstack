const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, required: true, ref: "User"},
    orderItems: [
        {
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            product: {type: mongoose.Schema.ObjectId, required: true, ref: "Product"},
        }
    ],
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        digitalAddress: {type: String, required: true},
        country: {type: String, required: true},
        phone: {type: Number, required: true},
    },
    // paymentResult: {
    //     reference: {type: String},
    //     status: {type: String},
    //     update_time: {type: String},
    //     email_address: {type: String},
    // },
    paymentResult: {type: Object, required: true},
    shippingPrice: {type: Number, required: true, default: 0},
    productsTotalPrice: {type: Number, required: true, default: 0},
    totalPrice: {type: Number, required: true, default: 0},
    isPaid: {type: Boolean, required: true, default: false},
    paidAt: {type: Date},
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {type: Date},

}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order