import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../Redux/Actions/UserActions'
import Error from '../components/LoadingError/Error'
import Loading from '../components/LoadingError/Loading'

const Register = () => {
    const navigation  = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const dispatch = useDispatch()
    const registerUser = useSelector((state) => state.registerUser)
    const {error, loading, userInfo } = registerUser

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo: loginUserInfo } = userLogin

    useEffect(() => {
      if (userInfo) {
        navigation('/')
      }
    }, [dispatch, userInfo, navigation])

    useEffect(() =>{
        if(loginUserInfo){
            navigation('/')
        }
    }, [loginUserInfo, navigation])

    const registerHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password))
    }
    return (
        <>
            <Header />
            <div className="container d-flex flex-column justify-content-center align-items-center row">
                <form action="" className="Login col-md-8 col-lg-4 col-11" onSubmit={registerHandler}>
                    {
                        error && <Error variant={'alert-danger'}> {error} </Error>
                    }
                    {
                        loading && <Loading />
                    }
                    <input value={name} onChange = { (e) => setName(e.target.value)} type="text" placeholder='Full Name' />
                    <input value={email} onChange = { (e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='Email' />
                    <input value={password} onChange = { (e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder='Password' />
                    <button style={{background : 'black', padding: '20px 10px', width: '100%', border: 'none', marginTop: '20px', color: 'white'}} type='submit'> Login </button>
                    <p className='mt-3' style={{fontSize: '16px', marginTop: '10px', textAlign: 'left'}}>
                        Have an account ? <Link style={{fontWeight : 'bold'}} to={"/login"}> Login </Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Register