import React, {useState, useEffect } from 'react'
import Header from '../components/Header'
import Ratings from '../components/Home/Ratings'
import Message from '../components/LoadingError/Error'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../Redux/Actions/ProductAction'
import Loading from '../components/LoadingError/Loading';
import Error from '../components/LoadingError/Error'
import {useNavigate} from 'react-router-dom'

const SingleProduct = () => {
    const navigation = useNavigate()
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const params = useParams()
    const productId = params.id

    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(productId))
    }, [dispatch, productId])

    const getQty = (e) => {
        setQty(e.target.value)
    }

    //Add Product to Cart
    const AddToCart = (e) => {
        e.preventDefault()
        navigation('/cart', { state: { id: productId, qty: qty } } )
    }
    return (
        <>
            <Header />
            <div className="container single-product">
                {
                    loading ? (
                        <div className='mb-5'> <Loading /> </div>
                    ) : error ? (
                        <Error variant="alert alert-danger">{error}</Error>
                    ) : (
                        <>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="single-image">
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product-dt-1">
                                        <div className="product-info">
                                            <div className="product-name">{product.name}</div>
                                        </div>
                                        <p>{product.description}</p>

                                        <div className="product-count col-lg-7">
                                            <div className="flex-box d-flex justify-content-between align-items-center flex-row">
                                                <h4>Price</h4>
                                                <span>{product.price}</span>
                                            </div>
                                            <div className="flex-box d-flex justify-content-between align-items-center flex-row">
                                                <h4>Status</h4>
                                                {
                                                    product.countInStock > 0 ? (  <span>In Stock </span>) : ( <span>Out of Stock</span>)
                                                }
                                            </div>
                                            <div className="flex-box d-flex justify-content-between align-items-center flex-row">
                                                <h4>Reviews</h4>
                                                <Ratings value={product.rating} text={`${product.numReviews}`} />
                                            </div>

                                            {
                                                product.countInStock > 0 ? (
                                                    <>
                                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                                            <h6>Quantity</h6>
                                                            <select onChange={e => getQty(e)} name="" id="">
                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option onChange={setQty} value={x+1}> {x+1}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <button onClick={AddToCart} className="round-black-btn"> Add To Cart</button>
                                                    </>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-5">
                                <div className="col-md-6">
                                    <h6 className="mb-3">REVIEWS</h6>
                                    <Message variant={`alert-info mt-3`} > No Reviews</Message>
                                    <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                                        <strong>Admin Sobal</strong>
                                        <Ratings />
                                        <span>Jan 12 2022</span>
                                        <div className="alert alert-info mt-3">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, nemo vitae necessitatibus at blanditiis accusantium harum aspernatur. Suscipit iste alias officia accusantium porro id maiores non, rerum autem eum illo.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4>WRITE A CUSTOMER REVIEW</h4>
                                    <div className="my-4"></div>
                                    <form action="">
                                        <div className="my-4">
                                            <strong>Rating</strong>
                                            <select name="" id="" className="col-12 bg-light p-3 mt-2 border-0 rounded">
                                                <option value=""> Select...</option>
                                                <option value="1">1 - Poor </option>
                                                <option value="2">2 - Fair </option>
                                                <option value="3">3 - Good </option>
                                                <option value="4">4 - Very Good </option>
                                                <option value="5">5 - Excellent </option>
                                            </select>
                                        </div>
                                        <div className="my-4">
                                            <strong>Comment</strong>
                                            <textarea name="comment" id="comment" cols="30" rows="10" className="col-12 bg-light p-3 mt-2 border-0 rounded"></textarea>
                                            <button type='submit ' className='btn btn-primary'>Submit</button>
                                            <div className="mt-3">
                                                <p className="alert alert-info">
                                                    <p className="text-align-center">Please <Link to={'/login'}> Login</Link> to write a review</p>
                                                </p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    )
                }
               
            </div>

        </>
    )
}

export default SingleProduct