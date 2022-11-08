import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { login } from '../Redux/Actions/UserActions';
import Error from '../components/LoadingError/Error'
import Loading from '../components/LoadingError/Loading'

const Login = () => {
    window.scrollTo(0, 0)
    const navigation  = useNavigate()
    
    //redirect users from getting back to login screen after successful loign
    //const redirect  = navigation.search ? navigation.search.split("=")[1] : "/"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const {error, loading, userInfo } = userLogin

    useEffect(() => {
      if (userInfo) {
        navigation('/')
      }
    }, [dispatch, userInfo, navigation])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
 
    return (
        <>
            <Header />
            <div className="container d-flex flex-column justify-content-center align-items-center">
                
                <form action="" className="Login col-md-8 col-lg-4 col-11" onSubmit = {submitHandler} >
                    {
                        error && <Error variant={'alert-danger'}> {error} </Error>
                    }
                    {
                        loading && <Loading />
                    }
                    <input value={email} onChange = { (e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='Email' />
                    <input value={password} onChange = { (e) => setPassword(e.target.value)}  type="password" name="password" id="password" />
                    <button style={{background : 'black', padding: '20px 10px', width: '100%', border: 'none', marginTop: '20px', color: 'white'}} type='submit'> Login </button>
                    <p className='mt-3' style={{fontSize: '16px', marginTop: '10px', textAlign: 'left'}}>
                        Don't Have an account ? <Link style={{fontWeight : 'bold'}} to={"/register"}> Create Account </Link>
                    </p>
                </form> 
            </div>
        </>
    )
}

export default Login