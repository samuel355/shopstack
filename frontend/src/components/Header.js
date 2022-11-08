import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../Redux/Actions/UserActions'

const Header = () => {
    //const navigation  = useNavigate()
    //redirect users from getting back to login screen after successful login
    //const redirect  = navigation.search ? navigation.search.split("=")[1] : "/"
    
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // useEffect(() => {
    //   if (userInfo) {
    //     navigation(redirect)
    //   }
    // }, [dispatch, userInfo, navigation, redirect])

    const logoutHandler =(e) => {
        e.preventDefault()
        dispatch(logout())
    }

    return (
        <>
            <div className="Announcement">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center display-none">
                            <p>+233 246 56 2377</p>
                            <p>info@sam.com</p>
                        </div>
                        <div className="col-12 col-lg-6 d-flex justify-content-center just-content-lg-center">
                            <Link to='#'><i className="fab fa-facebook"></i></Link>
                            <Link to='#'><i className="fab fa-instagram"></i></Link>
                            <Link to='#'><i className="fab fa-youtube"></i></Link>
                            <Link to='#'><i className="fab fa-linked-in"></i></Link>
                            <Link to='#'><i className="fab fa-pinterest-p"></i></Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header">
                <div className="container">
                    {/* MOBILE HEADER  */}
                    <div className="mobile-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-6 d-flex align-items-center">
                                    <Link to={'/'}><img src="/images/logo/logo.svg" alt="Logo" /></Link>
                                </div>
                                
                                <div className="col-6 d-flex align-items-center justify-content-end">
                                    {
                                        userInfo ? (
                                            <div className="dropdown m-lg-5">
                                                <button className="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fas fa-user"></i> 
                                                </button>
                                                <ul className="dropdown-menu bg-light">
                                                    <li><Link to={'/profile'} className="dropdown-item" >Profile </Link></li>
                                                    <li><Link to={'#'} onClick={logoutHandler} className="dropdown-item" >Logout</Link></li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <>
                                                <button className='btn btn-light mx-3'> <Link to={'/register'}> Register </Link> </button>
                                                <button className='btn btn-light'> <Link to={'/login'}>Login </Link> </button>
                                            </>
                                        )
                                    }
                                    <Link to={'/cart'} className='cart-mobile-icon'>
                                        <i className="fas fa-shopping-bag"></i>
                                        <span className='badge'>{cartItems?.length}</span>
                                    </Link>
                                </div>
                                <div className="col-12 d-flex align-items-center mb-5 py-sm-4">
                                    <form className="input-group form">
                                        <input type="search" className='form-control rounded search' placeholder='Search' />
                                        <button type='submit' className='search-button'>Search</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PC HEADER */}
                <div className="pc-header">
                    <div className="row">
                        <div className="col-md-3 col-4 d-flex align-items-center ">
                            <Link className='navbar-brand' to={'/'}><img src="/images/logo/logo.svg" alt="Logo" /></Link>
                        </div>
                        <div className="col-md-6 col-8 d-flex align-items-center">
                            <form className="input-group">
                                <input type="search" className='form-control rounded search' placeholder='Search' />
                                <button type='submit' className='search-button'>Search</button>
                            </form>
                        </div>
                        <div className="col-md-3 d-flex justify-content-end align-items-center Logo">
                            {
                                userInfo ? (
                                    <div className="dropdown m-lg-5 mx-3">
                                        <button className="btn border mr-5 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-user"></i> Hi, {userInfo.name}
                                        </button>
                                        <ul className="dropdown-menu bg-light">
                                            <li><Link to={'/profile'} className="dropdown-item" >Profile </Link></li>
                                            <li><Link to={'#'} onClick={logoutHandler}  className="dropdown-item" >Logout</Link></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <>
                                        <button className='btn btn-light mx-3'> <Link to={'/register'}> Register </Link> </button>
                                        <button className='btn btn-light'> <Link to={'/login'}>Login </Link> </button>
                                    </>
                                )
                            }
                            <div className='mx-3 mx-lg-3 mx-md-3'>
                                <Link to={'/cart'} className='cart-mobile-icon'>
                                    <i className="fas cart-icon fa-shopping-bag">  </i>
                                    <span className='badge'>{cartItems?.length}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    )
}

export default Header