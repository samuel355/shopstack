import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import Rating from './Ratings'
import Pagination from './Pagination'

import {useDispatch, useSelector} from 'react-redux'
import { listProduct } from '../../Redux/Actions/ProductAction'
import Loading from '../LoadingError/Loading';
import Error from '../LoadingError/Error'

const ShoppingSection = ({keyword}) => {

    // const [products, setProducts] = useState([])

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const {data} = await axios.get('/api/products/');
    //         setProducts(data)
    //     }
    //     fetchProducts()
    // }, [])

    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList;

    useEffect( () => {
        dispatch(listProduct(keyword))
    }, [dispatch, keyword])
    
    return (
        <div className='container'>
            <div className="section">
                <div className="row">
                    <div className="col-lg-12 col-md-12 article">
                        <div className="shopcontainer row">
                            {
                                loading ? (<div className='mb-5'><Loading /></div>) : error ? (<Error variant="alert-danger">{error}</Error>)
                                : 
                                (
                                    <>
                                        {
                                            products.map((product)=> (
                                                <div key={product._id} className='shop col-lg-4 col-md-6 col-sm-6 mb-4'>
                                                    <div className="border-product">
                                                        <Link to={`/products/${product._id}`}>
                                                            <div className="shopBack">
                                                                <img src={product.image} alt={product.name} />
                                                            </div>
                                                        </Link>

                                                        <div className="shoptext">
                                                            <p>
                                                                <Link to={`/products/${product._id}`}>{product.name}</Link>
                                                            </p>

                                                            <Rating
                                                                value={product.rating}
                                                                text={`${product.numReviews} reviews`}
                                                            />
                                                            <h3>$ {product.price}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                )
                            }
                            
                            {/* Pagination */}
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingSection