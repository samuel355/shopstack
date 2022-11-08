import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { getOrderDetails } from '../Redux/Actions/OrderActions'
import moment from 'moment'

const OrderScreen = () => {

    const navigation = useNavigate()
    const params = useParams()
    const orderId = params.id
    
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const {order, loading, error, orderItems, shippingAddress} = orderDetails

    useEffect(() => {
        if(!orderId){
            navigation('/profile')
        }else{
            dispatch(getOrderDetails(orderId))
        }
    }, [orderId, navigation, dispatch])
    
    return (
        <>
            <Header />
            <div className="container">
                <div className="row order-detail">
                    <div className="col-lg-4 col-sm-4 mb-lg4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    <i className="fas fa-user"></i>
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5>
                                    <strong>Customer</strong>
                                </h5>
                                <p>{order.user.name}</p>
                                <p><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    <i className="fas fa-truck-moving"></i>
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5><strong>Order Info</strong></h5>
                                <p>Order ID: <span style={{fontWeight: '600', fontSize: '14px'}}>{order._id}</span></p>
                                <div className="bg-info p-2 col-12">
                                    <p className="text-white text-center text-sm-smart">
                                        <p>Paid on • {moment(order.createdAt).format('LL')}</p>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    <i className="fas fa-map-marker alt"></i>
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5><strong>Deliver To</strong></h5>
                                <p>Address: {order.shippingAddress.address} { ' '} •• { order.shippingAddress.city}</p>
                                <div className="bg-danger p-1 col-12">
                                    <p className="text-white text-center text-sm-start">{order.isDelivered ? 'Delivered' : ' Order Processing...'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="order-products justify-content-between">
                        {
                            order.orderItems.map((orderItem) => (
                                <div key={orderItem._id} className="col-lg-8">
                                    <div className="order-product row">
                                        <div className="col-md-3 col-6">
                                            <img src={orderItem.image} alt={orderItem.name} style={{width: '100%', height: '80px', objectFit: 'contain', marginBottom: '10px'}} />
                                        </div>
                                        <div className="col-md-5 col-6 d-flex align-items-center">
                                            <Link to={`/products/${orderItem._id}`}> 
                                                <h6>{orderItem.name}</h6>
                                            </Link>
                                        </div>
                                        <div className="col-md-2 mt-md-0 col-6 d-flex align-items-center flex-row">
                                        <h4 style={{marginRight: '10px'}}>Quantity </h4>
                                        <h6> {orderItem.qty}</h6>
                                    </div>
                                    <div className="col-md-2 mt-md-0 col-6 d-flex align-items-center flex-row">
                                        <h4 style={{marginRight: '10px'}}>SubTotal</h4>
                                        <h6 >${orderItem.qty * orderItem.price}</h6>
                                    </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="col-lg-3 d-flex align-items-center flex-column mt-5 subtotal-order">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td> <strong>Sub Total </strong></td>

                                        <td> $ {order.productsTotalPrice}</td>
                                    </tr>
                                    <tr>
                                        <td> <strong>Shipping</strong></td>

                                        <td>$ {order.shippingPrice}</td>
                                    </tr>
                                    
                                    <tr>
                                        <td> <strong>Total</strong></td>

                                        <td>$ {order.totalPrice} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderScreen