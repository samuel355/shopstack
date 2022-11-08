import React, { useEffect,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Error from '../components/LoadingError/Error'
import { ORDER_CREATE_REQUEST } from '../Redux/Constants/OrderConstants';

import { usePaystackPayment } from 'react-paystack';
import { createNewOrder } from '../Redux/Actions/OrderActions'

const PlaceOrderScreen = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo } = userLogin

    const cart = useSelector((state) => state.cart)
    const {shippingAddress, cartItems} = cart

    const shipping = 10;
    const shippingFee = parseFloat(shipping)

    const productsTotal = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2)
    const total = parseFloat(productsTotal) + shippingFee;
    
    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    const totalAmount = addDecimal(total)

    const createOrder = useSelector((state) => state.createOrder)
    const {order, success, error} = createOrder

    useEffect(() => {
        if(success){
            //redirect user to success page
            dispatch({type: ORDER_CREATE_REQUEST})
            navigation(`/success/${order._id}`)
        }
    }, [success, navigation, dispatch, order])

    const publicKey = "pk_test_85d861f51c4f4b230b4c7d010493005e888bd054"

    const config = {
        reference: (new Date()).getTime().toString(),
        email: userInfo.email,
        amount: totalAmount * 100,
        currency: 'GHS',
        publicKey,
        metadata: {
            name: userInfo.name,
            userId: userInfo._id,
        },
    };

    const initializePayment = usePaystackPayment(config);

     // you can call this function anything
    const onSuccess = (reference) => {
        dispatch(
            createNewOrder({
                paymentResult: {reference: reference},
                orderItems: cartItems,
                shippingAddress: shippingAddress,
                shippingPrice: shippingFee,
                productsTotalPrice: productsTotal,
                totalPrice: totalAmount
            }
        ))

        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
    };

    // you can call this function anything
    const onClose = (e) => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        alert('You have not completed your order yet. Make sure to complete this transaction to secure your products in cart')
    }
    
    const placeOrderHandler = (e) => {
        e.preventDefault();
        initializePayment(onSuccess, onClose)
    }

    return (
        <>
            <Header />  
            <div className="container mt-5">
                <div className="row order-details bg-light p-3 shadow-sm">
                    <div className="col-md-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-12 center">
                                <div className="alert alert-success order-box">
                                    <i className="fas fa-user"></i>
                                </div>
                                
                                <div className="center">
                                    <h5><strong>Customer</strong></h5>
                                    <p>{userInfo.name}</p>
                                    <p>{userInfo.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-12 center">
                                <div className="alert-success order-box mb-3">
                                    <i className="fas fa-truck-moving"></i>
                                </div>

                                <div className="center">
                                    <h5><strong>Order Info</strong></h5>
                                    <p>Shipping: {shippingAddress.address}</p>
                                    <p>Pay method: PayStack</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-12 center">
                                <div className="alert-success order-box mb-3">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="center">
                                    <h5><strong>Deliver to</strong></h5>
                                    <p>{shippingAddress.address}, {shippingAddress.city}</p>
                                    <p>Digital Address : {shippingAddress.digitalAddress}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row order-products justify-content-between">
                    <div className="col-lg-8">
                        {
                            cartItems.length === 0 ? (
                                <>
                                    <Error> Your Cart is Empty</Error>
                                    <p>Visit the <Link to={'/'} style={{fontSize: '16px', fontWeight: '400'}}>Store</Link> to add items to cart</p>
                                </>
                            ) :
                            cartItems.map((cartItem) => (
                                <div key={cartItem.product} className="order-product row">
                                    <div className="col-md-3 col-6">
                                        <img title={cartItem.name} src={cartItem.image} style={{width: '100%', height: '80px', objectFit: 'contain', marginBottom: '10px'}} alt={cartItem.name} />
                                    </div>
                                    <div className="col-md-5 col-6 d-flex-align-items-center">
                                        <Link to={`/products/${cartItem.product}`}> <h6 className='mt-4'>{cartItem.name}</h6></Link>
                                    </div>
                                    <div className="col-md-2 mt-md-0 col-6 d-flex align-items-center flex-row">
                                        <h4 style={{marginRight: '10px'}}>Quantity </h4>
                                        <h6> {cartItem.qty}</h6>
                                    </div>
                                    <div className="col-md-2 mt-md-0 col-6 d-flex align-items-center flex-row">
                                        <h4 style={{marginRight: '10px'}}>SubTotal</h4>
                                        <h6 >${cartItem.subtotal}</h6>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td><strong>Products</strong></td>
                                    <td>$ {productsTotal}</td>
                                </tr>
                                <tr>
                                    <td><strong>Shipping</strong></td>
                                    <td>$ {shipping}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total</strong></td>
                                    <td>$ {totalAmount}</td>
                                </tr>
                            </tbody>
                        </table>

                        {
                            cartItems.length === 0 ? null : (
                                <button className='shadow-sm my-3' style={{width: '100%', padding: '8px 0', borderRadius: '20px', border: 'none', backgroundColor: 'black', color: 'white', fontWeight: '700'}} type='submit' onClick={placeOrderHandler}>
                                    PAY $ {totalAmount}
                                </button>
                            )
                        }

                        {
                            error && (
                                <Error variant='alert-danger'>{error}</Error>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceOrderScreen