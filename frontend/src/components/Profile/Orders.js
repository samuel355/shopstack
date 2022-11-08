import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listMyOrders } from '../../Redux/Actions/OrderActions'
import Error from '../LoadingError/Error'
import Loading from '../LoadingError/Loading'
//import { Link } from 'react-router-dom'

const Orders = ({orders, loading, error}) => {

    // const dispatch = useDispatch()

    // const myOrdersList = useSelector((state) => state.myOrdersList)
    // const {loading, error, orders} = myOrdersList

    // useEffect(() => {
    //     dispatch(listMyOrders())
    // }, [dispatch])

    // console.log(orders)

    return (
        <div className='d-flex justify-content-center align-center flex-column'>
            {
                loading ? ( <Loading />) : error ? ( <Error variant="alert-danger"> {error}</Error> ) : 

                (
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>STATUS</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order, index) => (
                                        <tr className="alert-success">
                                            <td>
                                                <Link to={`/order/${order._id}`} className='link'> {order._id} </Link>
                                            </td>
                                            <td>Paid</td>
                                            <td>{moment(order.createdAt).calendar()}</td>
                                            <td>$ {order.totalPrice}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
            {
                orders?.length === 0 && (
                    <div className="col-12 alert alert-info text-center mt-3">
                        <Link style={{fontSize: '12px'}} className='btn btn-success mx-2 px-3 py-2' to={`/`}>
                            <p>START SHOPPING</p>
                        </Link>
                    </div>
                )
            }

            
        </div>
    )
}

export default Orders