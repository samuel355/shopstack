import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../Redux/Actions/CartActions';

const CartScreen = () => {
    const navigation = useNavigate()
    const {state} = useLocation()
    const productId = state?.id
    const qty = state?.qty

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2 )

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [ dispatch, productId, qty])

    const checkoutHandler = (e) => {
        e.preventDefault()
        //navigation('/login?redirect=shipping')
        navigation('/shipping')
    }

    const removeItemHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <>
            <Header />
            <div className="container">
                {
                    cartItems.length === 0 ? ( 
                        <div className="container">
                            <div className="alert d-flex align-items-center justify-content-between alert-info text-center mt-3">
                                <p className='text-center'>Your Cart is Empty</p>
                                <div className=' text-center'>
                                <Link className='text-center btn btn-success' to="/" style={{fontSize: "12px"}}> SHOP NOW </Link>
                            </div>
                            </div>
                            
                        </div> 
                    ) : (
                        <>
                            <div className="alert alert-info text-center mt-3">
                                Total Cart Products 
                                <Link to="/cart" className='text-success mx-2'>({cartItems.length === 1 ? `${cartItems.length} item` : `${cartItems.length} items`})</Link>
                            </div>

                            {
                                cartItems.map((cartItem) => (
                                    <>
                                        <div key={cartItem.product} className="row mb-2">
                                            <div className="col-md-4 col-sm-6 col-12 d-flex flex-row text-center align-items-center align-content-center justify-content-start mb-2">
                                                <div onClick={() => removeItemHandler(cartItem.product)} style={{cursor: 'pointer'}}><i className="fas fa-times text-danger"></i></div>
                                                <Link className='mx-3' to={`/products/${cartItem.product}`}> <img  src={cartItem.image} alt={cartItem.name} style={{width: '100%', height: '80px', objectFit: 'contain' }}/> </Link>
                                                <Link to={`/products/${cartItem.product}`}><h5>{cartItem.name}</h5></Link>
                                            </div>
                                            <div className="col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-end mb-2">
                                                <h5 className='mx-5'>Quantity</h5>
                                                    <select style={{padding: '4px'}} value={cartItem.qty} onChange={(e) => dispatch(addToCart(cartItem.product, Number(e.target.value)))} name="" id="">
                                                        {
                                                            [...Array(cartItem.countInStock).keys()].map((x) => (
                                                                <option key={x+1} value={x+1}> {x+1}</option>
                                                            ))
                                                        }
                                                    </select>
                                            </div>
                                            <div className="col-md-4 col-sm-6 col-12 d-flex justify-content-end">
                                                <div style={{borderRight: '1px solid gray', padding: '10px'}}>
                                                    <h6 style={{textAlign: 'right'}}>Price</h6>
                                                    <h5 style={{textAlign: 'right'}}>$ {cartItem.price}</h5>
                                                </div>
                                                <div style={{padding: '10px'}}>
                                                    <h6 style={{textAlign: 'right'}}>Sub Total </h6>
                                                    <h5 style={{textAlign: 'right'}}>$ {cartItem.subtotal}</h5>
                                                </div>
                                            </div>
                                        </div> <hr />
                                    </>
                                ))
                            }

                            <div className="total">
                                <span className="sub">Total Price: </span>
                                <span className="total-price">$ {total} </span>
                            </div>

                            <div className="cart-buttons d-flex align-items-center row">
                                <Link to="/" className='col-md-6'>
                                    <button>Continue To Shopping</button>
                                </Link>
                                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                                    {
                                        total > 0 && (
                                            <button onClick={checkoutHandler}>
                                                Checkout
                                            </button>
                                        )
                                    }
                                </div>
                            </div> 
                        </>
                    )
                }
            </div>
        </>
    )
}

export default CartScreen