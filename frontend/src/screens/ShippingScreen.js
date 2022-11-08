import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import Toast from '../components/LoadingError/Toast'

import { saveShippingAddress } from '../Redux/Actions/CartActions'

const ShippingScreen = () => {
    //window.scrollTo(0, 0)
    const navigation  = useNavigate()

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [addressErr, setAddressErr] = useState(false)

    const [city, setCity] = useState(shippingAddress.city)
    const [cityErr, setCityErr] = useState(false)

    const [digitalAddress, setDigitalAddress] = useState(shippingAddress.digitalAddress)
    const [digitalAddressErr, setDigitalAddressErr] = useState(false)

    const [country, setCountry] = useState(shippingAddress.country)
    const [countryErr, setCountryErr] = useState(false)

    const [phone, setPhone] = useState(shippingAddress.phone)
    const [phoneErr, setPhoneErr] = useState(false)

    const toastId = useRef(null)

    const ToastObjects = {
        pauseOnFocusLoss : false,
        draggable : false,
        pauseOnHover: false,
        autoClose: 2000
    }

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo } = userLogin

    useEffect(() => {
        if (userInfo === null || userInfo === {} ) {
          navigation('/login')
        }
    }, [userInfo, navigation])

    const submitHandler = (e) => {
        e.preventDefault()
        
        if(address  === '') {
            setAddressErr(true)
            toastId.current = toast.error("Enter your Address", ToastObjects)
        }else{
            setAddressErr(false)
        }

        if(city  === '') {
            setCityErr(true)
            toastId.current = toast.error("Enter your City", ToastObjects)
        }else{
            setCityErr(false)
        }

        if(digitalAddress  === '') {
            setDigitalAddressErr(true)
            toastId.current = toast.error("Enter your Digital Address", ToastObjects)
        }else{
            setDigitalAddressErr(false)
        }

        if(country  === '') {
            setCountryErr(true)
            toastId.current = toast.error("Enter your Country", ToastObjects)
        }else{
            setCountryErr(false)
        }
        if(phone  === '') {
            setPhoneErr(true)
            toastId.current = toast.error("Enter your Phone Number", ToastObjects)
        }else{
            setPhoneErr(false)
        }

        if(address !== '' && city !== '' && digitalAddress !== '' && country !== '' && phone !== ''){
            dispatch(saveShippingAddress({address, city, digitalAddress, country, phone}))
            navigation('/placeorder')
        }
    }

    return (
        <>
            <Header />
            <Toast />
            <div className="row container d-flex justify-content-center align-items-center login-box">
                <form onSubmit={submitHandler} action="" className="Login addressForm col-md-8 col-lg-4 col-11">
                    <h6>DELIVERY ADDRESS</h6>
                    <input style={{borderColor: `${addressErr ? 'red' : 'gray'}`}} value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder='Enter Address' />
                    <input style={{borderColor: `${cityErr ? 'red' : 'gray'}`}} value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder='Enter City' />
                    <input style={{borderColor: `${digitalAddressErr ? 'red' : 'gray'}`}} value={digitalAddress} onChange={(e) => setDigitalAddress(e.target.value)} type="text" placeholder='Digital Address' />
                    <input style={{borderColor: `${countryErr ? 'red' : 'gray'}`}}  value={country} onChange={(e) => setCountry(e.target.value)} type="text" placeholder='Enter Country' />
                    <input style={{borderColor: `${phoneErr ? 'red' : 'gray'}`}}  value={phone} onChange={(e) => setPhone(e.target.value)} type="number" placeholder='Phone Number' />
                    <button style={{background : 'black', padding: '20px 10px', width: '100%', border: 'none', marginTop: '20px', color: 'white'}} type='submit'> Proceed to Payment</button>
                </form>
            </div>
        </>
    )
}

export default ShippingScreen