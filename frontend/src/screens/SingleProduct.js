import React, {useState, useEffect } from 'react'
import Header from '../components/Header'
import Ratings from '../components/Home/Ratings'
import Message from '../components/LoadingError/Error'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview, listProductDetails } from '../Redux/Actions/ProductAction'
import Loading from '../components/LoadingError/Loading';
import Error from '../components/LoadingError/Error'
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import { PRODUCT_REVIEW_RESET } from '../Redux/Constants/ProductConstants'

const SingleProduct = () => {
    const navigation = useNavigate()
    const [qty, setQty] = useState(1)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [disabled, setDisabled] = useState(false)

    const dispatch = useDispatch()
    const params = useParams()
    const productId = params.id

    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {loading: reviewLoading, error: reviewError, success  } = productReviewCreate

    useEffect(() => {
        dispatch(listProductDetails(productId))
    }, [dispatch, productId])

    useEffect(() => {
        if(success){
            setRating(0)
            setComment("")
        }
        dispatch({
            type: PRODUCT_REVIEW_RESET
        })
    }, [success, dispatch, productId])

    const getQty = (e) => {
        setQty(e.target.value)
    }

    //Add Product to Cart
    const AddToCart = (e) => {
        e.preventDefault()
        navigation('/cart', { state: { id: productId, qty: qty } } )
    }
    
    //Add Review
    const submitReviewHandler = (e) => {
        e.preventDefault()
        setDisabled(true)

        dispatch(createProductReview(productId,{
            rating, 
            comment
        }))
        alert("Review Submitted")
        document.location.reload(true)
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
                                    {
                                        reviewLoading ? (<Loading /> ) : reviewError && (<Error variant="alert-danger"> {reviewError}</Error>) 
                                    }
                                    {
                                        product.reviews.length === 0 ? (
                                            <Message variant={`alert-info mt-3`} > No Reviews For this product. Add a Review below </Message>
                                        ): (
                                            product.reviews.map((review) => (
                                                <div key={review._id} className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                                                    <strong>{review.name}</strong>
                                                    <Ratings value={review.rating} />
                                                    <span> {moment(review.createdAt).calendar()} </span>
                                                    <div className="alert alert-info mt-3">
                                                        {review.comment}
                                                    </div>
                                                </div>
                                            ))
                                            
                                        )
                                    }
                                </div>

                                <div className="col-md-6">
                                    <h4>WRITE A CUSTOMER REVIEW</h4>
                                    <div className="my-4"></div>
                                    {
                                        userInfo === null ? (
                                            <div className="mt-3">
                                                <p className="alert alert-info">
                                                    <p className="text-align-center">Please <Link to={'/login'}> Login</Link> to add your review to this product</p>
                                                </p>
                                            </div>
                                        ): 
                                        (
                                            <form action="" onSubmit={submitReviewHandler}>
                                                <div className="my-4">
                                                    <strong>Rating</strong>
                                                    <select value={rating} onChange={(e)=>setRating(e.target.value)} name="rating" id="rating" className="col-12 bg-light p-3 mt-2 border-0 rounded">
                                                        <option value="0"> Select...</option>
                                                        <option value="1">1 - Poor </option>
                                                        <option value="2">2 - Fair </option>
                                                        <option value="3">3 - Good </option>
                                                        <option value="4">4 - Very Good </option>
                                                        <option value="5">5 - Excellent </option>
                                                    </select>
                                                </div>
                                                <div className="my-4">
                                                    <strong>Comment</strong>
                                                    <textarea value={comment} onChange={(e) => setComment(e.target.value) } name="comment" id="comment" cols="30" rows="10" className="col-12 bg-light p-3 mt-2 border-0 rounded"></textarea>
                                                    <button type='submit' disabled={disabled} className='btn btn-primary'>Submit</button>
                                                </div>
                                            </form>
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

export default SingleProduct