import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { getOrderDetails } from '../Redux/Actions/OrderActions'

const Success = () => {

    const navigation = useNavigate()
    const params = useParams()
    const orderId = params.id
    
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const {order, loading, error, orderItems, shippingAddress} = orderDetails

    useEffect(() => {
        if(!orderId){
            navigation('/profile')
        }
    }, [orderId, navigation])
    
    const viewOrderDetailsHandler = (e) => {
        e.preventDefault()
        dispatch(getOrderDetails(orderId))
        navigation(`/order/${orderId}`)
    }

    return (
        <>
            <Header />
            <div className="m-5" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{backgroundColor: '#eee', width: '350px', padding: ' 20px', textAlign:'center', borderRadius: '10px'}}>
                    <h4>Thank you for your order</h4>
                    <p>Your order will be ready soon to be delivered. Thank you.</p>
                    <button onClick={viewOrderDetailsHandler} style={{background: 'black', color: 'white',padding: '8px 60px', borderRadius: '20px', marginBottom: '10px'}} >View Orders </button>
                </div>
            </div>  
        </>
    )
}

export default Success